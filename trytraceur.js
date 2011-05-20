(function(){

var showSource = false

function countParams(line){
    var paramStack = []
    function last(){
        return paramStack[paramStack.length - 1]
    }
    var otherHalf = {
        '{': '}',
        '(': ')',
        '[': ']'
    }
    var m
    while(m = line.match(/[\(\)\{\}\[\]]/)){
        if (otherHalf[last()] === m[0])
            paramStack.pop()
        else
            paramStack.push(m[0])
        line = line.slice(m.index + 1)
    }
    return paramStack.length
}
function displayData(data){
    if ('reply' in data){
        var msg = control.htmlEncode(data.reply)
        control.messageBeforePrompt(msg, 'reply')
    }else if ('error' in data){
        control.messageBeforePrompt(data.error, 'error')
    }else if ('console' in data){
        control.messageBeforePrompt(data.console, 'console')
    }else if ('source' in data){
        control.messageBeforePrompt(data.source, 'source')
    }
}
function layout(){
    $('#console, #console .jquery-console-inner').css({
        height: ($(window).height() - 22) + 'px'
    })
    $('#slideBoard').css({
        height: $(window).height() + 'px',
        width: $(window).width() + 'px'
    })
}
function traceurEval(js){
    var reporter = new traceur.util.ErrorReporter();
    var errMsg
    reporter.reportMessageInternal = function(location, kind, format, args) {
        var i = 0;
        errMsg = format.replace(/%s/g, function() {
            return args[i++];
        })
        if (location)
            errMsg = 'Line ' + location.line + ' Column ' + location.column + ': ' + errMsg;
    };
    var project = new traceur.semantics.symbols.Project()
    var sourceFile = new traceur.syntax.SourceFile('repl', js);
    project.addFile(sourceFile);
    try{
        var res = traceur.codegeneration.Compiler.compile(reporter, project, false);
    
        if (reporter.hadError()) {
            displayData({error: errMsg})
            return undefined
        } else {
            var source = traceur.codegeneration.ProjectWriter.write(res).toString().substring(7);
            if (showSource)
                displayData({source: source})
            return window.eval(source)
        }
    }catch(e){
        displayData({error: e.message})
    }
}

function print(msg){
    control.messageBeforePrompt(msg)
}
var control = $('#console').console({
    promptLabel: '> ',
    commandValidate:function(line){
        return line != ''
    },
    continuedPromptLabel: '  ',
    commandHandle:function(line){
        if (countParams(line) > 0){
            control.continuedPrompt = true
        }else{
            control.continuedPrompt = false
            control.commandResult('')
            
            if (line == ':help')
                printUsage()
            else if (line == ':srcon')
                showSource = true
            else if (line == ':srcoff')
                showSource = false
            else if (line == ':ref')
                open('http://code.google.com/p/traceur-compiler/wiki/LanguageFeatures')
            else if (line == ':clear')
                control.reset()
            else{
                var reply
                try{
                    var result = traceurEval(line)
                    if (typeof result === 'string')
                        result = "'" + result + "'"
                    if (result !== undefined)
                        reply = {reply: String(result)}
                }catch(e){
                    var emsg = String(e)
                    if (emsg.charAt(0) == '[')
                        emsg = 'Error: ' + e.message
                    reply = {error: emsg}
                }finally{
                    if (reply)
                        displayData(reply)
                }
            }
        }
    },
    autofocus: true,
    animateScroll:true,
    promptHistory:true
})
function consoleLog(){
    var msg = Array.prototype.slice.call(arguments)
    displayData({console: msg.join(' ')})
}
console = {
    log: consoleLog,
    error: function(){
        var msg = Array.prototype.slice.call(arguments)
        displayData({error: msg.join(' ')})
    }
}
function printUsage(){
    print("<br>You can execute Traceur's next-gen Javascript in the shell below.")
    if (!navigator.userAgent.match(/Chrome/) && 
        !navigator.userAgent.match(/Firefox\/4/)){
        displayData({error: "WARNING: This code only works in Chrome and maybe Firefox 4. You don't seem to be using either. That *could* be a problem."})
    }
    print("The following commands are also available: ")
    print("<br>")
    print("&nbsp;:help - prints this help message")
    print("&nbsp;:srcon - show generated source code")  
    print("&nbsp;:srcoff - don't show generated source code(default)")
    print('&nbsp;:ref - open <a href="http://code.google.com/p/traceur-compiler/wiki/LanguageFeatures">Traceur language feature reference</a>')
    print("&nbsp;:clear - clear the shell")
    print("<br>")
}
print('Welcome to Try Traceur')
print('======================')
print('From the <a href="http://code.google.com/p/traceur-compiler/">Traceur Web Site</a>: <br><br><i>Traceur is a JavaScript.next-to-JavaScript-of-today compiler that allows you to use features from the future *today*.</i>')
printUsage()
layout()
$(window).resize(layout)

}())