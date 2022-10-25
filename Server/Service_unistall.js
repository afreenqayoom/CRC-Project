var Service=require('node-windows').Service;
var svc=new Service({
    name:"CRC SERVER",
    description:"CRC SERVER",
    script:"C:\\React Projects\\CRC-project\\Server\\Server.js"
});

svc.on('uninstall',function(){
    console.log('Service unistalled....');
});

svc.uninstall();