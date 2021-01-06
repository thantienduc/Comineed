import sys
sys.path.append('/Library/Frameworks/Python.framework/Versions/3.7/lib/python3.7/site-packages')

from http.server import BaseHTTPRequestHandler, HTTPServer
import socketserver
import json
import random
from geotext import GeoText

class S(BaseHTTPRequestHandler):
    def _set_headers(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()

    def do_GET(self):
        self._set_headers()
        f = open("index.html", "r")
        self.wfile.write(f.read())

    def do_HEAD(self):
        self._set_headers()
    
    def do_POST(self):
        self._set_headers()
        print ("in post method")
        data_bytes = self.rfile.read(int(self.headers['Content-Length']))

        self.send_response(200)
        self.end_headers()

        data_string = data_bytes.decode('utf-8')

        #Process data_string
        places = GeoText(data_string)
        list_output = {
            "cities":places.cities,
            "countries":places.countries,
        }
        #End processing

        #with open("test123456.json", "w") as outfile:
        output_bytes = json.dumps(list_output).encode('utf-8')
        print ("{}".format(data_string))
        self.wfile.write(output_bytes)
        return


def run(server_class=HTTPServer, handler_class=S, port=2204):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print ('Starting httpd...')
    httpd.serve_forever()

if __name__ == "__main__":
    from sys import argv

if len(argv) == 2:
    run(port=int(argv[1]))
else:
    run()