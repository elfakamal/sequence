
curl -X POST 'http://localhost:9200/flow/flow' -d @flow1.json
curl -X POST 'http://localhost:9200/flow/flow' -d @flow2.json
curl -X POST 'http://localhost:9200/flow/flow' -d @flow3.json
curl -X POST 'http://localhost:9200/flow/flow' -d @flow4.json
curl -X POST 'http://localhost:9200/flow/flow' -d @flow5.json
curl -X POST 'http://localhost:9200/flow/flow' -d @flow6.json
curl -X POST 'http://localhost:9200/flow/flow' -d @flow7.json
curl -X POST 'http://localhost:9200/flow/flow' -d @flow8.json

curl -X POST 'http://localhost:9200/.kibana/index-pattern' -d @indexPattern.json
curl -X POST 'http://localhost:9200/.kibana/config' -d @defaultIndex.json
curl -X POST 'http://localhost:9200/.kibana/visualization' -d @visualization.json
