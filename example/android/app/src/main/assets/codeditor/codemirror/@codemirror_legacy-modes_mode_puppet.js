async function moduleInitFunction(requireAsyncModule,exports={}){const module={exports:exports};var hasRequiredPuppet,puppet$1={},puppetExports=function requirePuppet(){// Takes a string of words separated by spaces and adds them as
// keys with the value of the first argument 'style'
function define(style,string){for(var split=string.split(" "),i=0;i<split.length;i++)words[split[i]]=style}// Takes commonly known puppet types/words and classifies them to a style
// After finding a start of a string ('|") this function attempts to find the end;
// If a variable is encountered along the way, we display it differently when it
// is encapsulated in a double-quoted string.
function tokenString(stream,state){for(var current,prev,found_var=!1;!stream.eol()&&(current=stream.next())!=state.pending;){if("$"===current&&"\\"!=prev&&"\""==state.pending){found_var=!0;break}prev=current}return found_var&&stream.backUp(1),state.continueString=current!=state.pending,"string"}// Main function
function tokenize(stream,state){// Matches one whole word
var word=stream.match(/[\w]+/,!1),attribute=stream.match(/(\s+)?\w+\s+=>.*/,!1),resource=stream.match(/(\s+)?[\w:_]+(\s+)?{/,!1),special_resource=stream.match(/(\s+)?[@]{1,2}[\w:_]+(\s+)?{/,!1),ch=stream.next();// Matches attributes (i.e. ensure => present ; 'ensure' would be matched)
// Matches non-builtin resource declarations
// (i.e. "apache::vhost {" or "mycustomclasss {" would be matched)
// Matches virtual and exported resources (i.e. @@user { ; and the like)
// Finally advance the stream
// Have we found a variable?
if("$"===ch)return stream.match(variable_regex)?state.continueString?"variableName.special":"variable":"error";// Otherwise return an invalid variable
// Should we still be looking for the end of a string?
if(state.continueString)return stream.backUp(1),tokenString(stream,state);// Are we in a definition (class, node, define)?
if(state.inDefinition){// If so, return def (i.e. for 'class myclass {' ; 'myclass' would be matched)
if(stream.match(/(\s+)?[\w:_]+(\s+)?/))return"def";// Match the rest it the next time around
stream.match(/\s+{/),state.inDefinition=!1}// Are we in an 'include' statement?
return state.inInclude?(stream.match(/(\s+)?\S+(\s+)?/),state.inInclude=!1,"def"):stream.match(/(\s+)?\w+\(/)?(stream.backUp(1),"def"):attribute?(stream.match(/(\s+)?\w+/),"tag"):word&&words.hasOwnProperty(word)?(stream.backUp(1),stream.match(/[\w]+/),stream.match(/\s+\S+\s+{/,!1)&&(state.inDefinition=!0),"include"==word&&(state.inInclude=!0),words[word]):/(^|\s+)[A-Z][\w:_]+/.test(word)?(stream.backUp(1),stream.match(/(^|\s+)[A-Z][\w:_]+/),"def"):resource?(stream.match(/(\s+)?[\w:_]+/),"def"):special_resource?(stream.match(/(\s+)?[@]{1,2}/),"atom"):"#"==ch?(stream.skipToEnd(),"comment"):"'"==ch||"\""==ch?(state.pending=ch,tokenString(stream,state)):"{"==ch||"}"==ch?"bracket":"/"==ch?(stream.match(/^[^\/]*\//),"string.special"):ch.match(/[0-9]/)?(stream.eatWhile(/[0-9]+/),"number"):"="==ch?(">"==stream.peek()&&stream.next(),"operator"):(stream.eatWhile(/[\w-]/),null);// Do we just have a function on our hands?
// In 'ensure_resource("myclass")', 'ensure_resource' is matched
// Have we matched the prior attribute regex?
// Do we have Puppet specific words?
// Is there a match on a reference?
// Have we matched the prior resource regex?
// Have we matched the prior special_resource regex?
// Match all the comments. All of them.
// Have we found a string?
// Match all the brackets
// Match characters that we are going to assume
// are trying to be regex
// Match all the numbers
// Match the '=' and '=>' operators
// Keep advancing through all the rest
// Return a blank line for everything else
}// Start it all
if(hasRequiredPuppet)return puppet$1;hasRequiredPuppet=1,Object.defineProperty(puppet$1,"__esModule",{value:!0});// Stores the words from the define method
var words={},variable_regex=/({)?([a-z][a-z0-9_]*)?((::[a-z][a-z0-9_]*)*::)?[a-zA-Z0-9_]+(})?/;// Taken, mostly, from the Puppet official variable standards regex
define("keyword","class define site node include import inherits"),define("keyword","case if else in and elsif default or"),define("atom","false true running present absent file directory undef"),define("builtin","action augeas burst chain computer cron destination dport exec file filebucket group host icmp iniface interface jump k5login limit log_level log_prefix macauthorization mailalias maillist mcx mount nagios_command nagios_contact nagios_contactgroup nagios_host nagios_hostdependency nagios_hostescalation nagios_hostextinfo nagios_hostgroup nagios_service nagios_servicedependency nagios_serviceescalation nagios_serviceextinfo nagios_servicegroup nagios_timeperiod name notify outiface package proto reject resources router schedule scheduled_task selboolean selmodule service source sport ssh_authorized_key sshkey stage state table tidy todest toports tosource user vlan yumrepo zfs zone zpool");const puppet={name:"puppet",startState:function(){var state={inDefinition:!1,inInclude:!1,continueString:!1,pending:!1};return state},token:function(stream,state){// Strip the spaces, but regex will account for them eitherway
return stream.eatSpace()?null:tokenize(stream,state);// Go through the main process
}};return puppet$1.puppet=puppet,puppet$1}(),puppet=/*@__PURE__*/function getDefaultExportFromCjs(x){return x}(puppetExports);return module.exports=puppet,module.exports}