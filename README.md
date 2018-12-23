# NodeJS_Copy_Collection

This code was created to copy a entire __MongoDB__ collection via NodeJS.
- Before starting, be sure to change the following variables:

<br/>

* __urlSource__

* __urlTarget__

* __dbSource__

* __dbTarget__

* __collectionSource__

* __collectionTarget__


* *__chunks__*
    * This variable refers to the number of documents to be copied for each connection to the database.
    * You can leave the default value of __100__ if desired.
	* You can use a higher or lower number, depending on the performance of your server.

* *__timeOut__*
    * This variable refers to the timeout (in milliseconds) between each connection to the database.
    * You can leave the default value of __7000__ if desired.
	* You can use a higher or lower number, depending on the performance of your server.
	* You can even replace the line

&nbsp;&nbsp;&nbsp;&nbsp; ```setTimeout(copyDocumentsInChunks, timeOut, skip + limit, limit, count, collectionSource);```

&nbsp;&nbsp;&nbsp;&nbsp; with

&nbsp;&nbsp;&nbsp;&nbsp; ```copyDocumentsInChunks(skip + limit, limit, count, collectionSource);```

&nbsp;&nbsp;&nbsp;&nbsp; To completely remove the wait between the connections.
