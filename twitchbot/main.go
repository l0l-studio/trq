package main

import (
	//"fmt"
	"flag"
	"fmt"
	"html/template"
	"log"
	"net/http"
	"strings"

	"github.com/gempir/go-twitch-irc/v4"
	"github.com/gorilla/websocket"
)

var addr = flag.String("addr", "localhost:8080", "http service address")

var upgrader = websocket.Upgrader{
	Subprotocols: []string{"echo"},
    CheckOrigin: func (r *http.Request) bool  {
        return true
    },
} // use default options

func twHandler(tw *twitch.Client) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		//enableCors(&w)

        paths := strings.Split(r.URL.Path, "/")
        channel := paths[len(paths) - 1];

		c, err := upgrader.Upgrade(w, r, nil)

		fmt.Println("running")
		fmt.Println(c.Subprotocol())
		if err != nil {
			log.Print("upgrade:", err)
			return
		}
		defer c.Close()

		tw.Join(channel)

		for {
			_, message, err := c.ReadMessage()
			if err != nil {
				log.Println("read:", err)

				break
			}

			tw.Say(channel, string(message))
			if err != nil {
				log.Println("write:", err)
				break
			}
		}
	}

}

func home(w http.ResponseWriter, r *http.Request) {
	homeTemplate.Execute(w, "ws://"+r.Host+"/trq")
}

func enableCors(w *http.ResponseWriter) {
	//Todo make this dynamic and allow multipe origins
	(*w).Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
}

func main() {

	client := twitch.NewClient("trq", "oauth:357e6lkb0iggvdk7sm6kgs2ao0567g")

	client.OnPrivateMessage(func(message twitch.PrivateMessage) {
		fmt.Println(message.Message)
	})

	go func() {
		err := client.Connect()

		if err != nil {
			fmt.Println("err")
			panic(err)
		}
	}()

	flag.Parse()
	log.SetFlags(0)

	fmt.Printf("running %v", *addr)
	http.HandleFunc("/trq/", twHandler(client))
	//http.HandleFunc("/echo", echo)
	http.HandleFunc("/", home)
	log.Fatal(http.ListenAndServe(*addr, nil))

}

var homeTemplate = template.Must(template.New("").Parse(`
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<script>
window.addEventListener("load", function(evt) {

    var output = document.getElementById("output");
    var input = document.getElementById("input");
    var ws;

    var print = function(message) {
        var d = document.createElement("div");
        d.textContent = message;
        output.appendChild(d);
        output.scroll(0, output.scrollHeight);
    };

    document.getElementById("open").onclick = function(evt) {
        if (ws) {
            return false;
        }
        ws = new WebSocket("{{.}}", ["echo"]);
        ws.onopen = function(evt) {
            print("OPEN");
        }
        ws.onclose = function(evt) {
            print("CLOSE");
            ws = null;
        }
        ws.onmessage = function(evt) {
            print("RESPONSE: " + evt.data);
        }
        ws.onerror = function(evt) {
            print("ERROR: " + evt.data);
        }
        return false;
    };

    document.getElementById("send").onclick = function(evt) {
        if (!ws) {
            return false;
        }
        print("SEND: " + input.value);
        ws.send(input.value);
        return false;
    };

    document.getElementById("close").onclick = function(evt) {
        if (!ws) {
            return false;
        }
        ws.close();
        return false;
    };

});
</script>
</head>
<body>
<table>
<tr><td valign="top" width="50%">
<p>Click "Open" to create a connection to the server,
"Send" to send a message to the server and "Close" to close the connection.
You can change the message and send multiple times.
<p>
<form>
<button id="open">Open</button>
<button id="close">Close</button>
<p><input id="input" type="text" value="Hello world!">
<button id="send">Send</button>
</form>
</td><td valign="top" width="50%">
<div id="output" style="max-height: 70vh;overflow-y: scroll;"></div>
</td></tr></table>
</body>
</html>
`))
