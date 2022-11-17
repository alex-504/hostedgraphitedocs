
Go
==

.. index:: Go

Sending a metric via TCP
------------------------

.. code-block:: go

    import (
        "fmt"
        "net"
    )

    ...
    conn, err := net.Dial("tcp", "YOUR-UID.carbon.hostedgraphite.com:2003")
    _, err = fmt.Fprintf(conn, "YOUR-API-KEY.foo 1.2\n")
    // don't forget to handle the error and close connection


Sending a metric via UDP
------------------------

.. code-block:: go

    import (
        "fmt"
        "net"
    )

    ...
    conn, err := net.Dial("udp", "YOUR-UID.carbon.hostedgraphite.com:2003")
    _, err = fmt.Fprintf(conn, "YOUR-API-KEY.foo 1.2\n")
    // don't forget to handle the error and close connection

Sending a metric using HTTP
---------------------------

.. code-block:: go

    import (
        "bytes"
        "encoding/base64"
        "net/http"
    )

    ...
    req, err := http.NewRequest("PUT", "https://www.hostedgraphite.com/api/v1/sink", bytes.NewBufferString("foo 1.2\n"))
    base64_apikey := base64.StdEncoding.EncodeToString([]byte("YOUR-API-KEY"))
    req.Header.Add( "Authorization", "Basic "+ base64_apikey )
    
    client := http.Client{}
    reply, errdo := client.Do(req)
    // don't forget to handle the error and close connection
   

.. include:: ../common/common_getapikey.rst
.. raw:: html

    <script src="../_static/uid_prefix.js"></script>


