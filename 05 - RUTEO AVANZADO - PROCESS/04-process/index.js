console.log("CWD: ", process.cwd()); //directorio actual de trabajo
console.log("PID: ", process.pid); //process id
console.log("VERSION: ", process.version); //version node
console.log("PLATFORM: ", process.platform); //sistema operativo
console.log("MEMORY: ", `${JSON.stringify(process.memoryUsage())}`);

process.exit(1)

console.log('hola');