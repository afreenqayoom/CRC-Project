var Service=require('node-windows').Service
var svc=new Service({
    name:"CRCSERVER",
    description:"CRC SERVER",
    script:"C:\\React Projects\\CRC-project\\Server\\Server.js"
})

svc.on('install',function(){
    svc.start()
})

svc.install();