
#!/bin/bash

for f in day*.js; do cat $f | node lines.js; done | awk 'NR>1{print buf}{buf = $0}' | awk '{a+=$1} END{print a/NR}'
