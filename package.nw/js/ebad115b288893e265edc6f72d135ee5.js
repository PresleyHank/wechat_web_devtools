;!function(require, directRequire){;"use strict";const React=require("react"),classNames=require("classnames"),{connect}=require("react-redux"),WXML=require('./99fff845d6c7bff564f99e38e435f827.js'),SENSOR=require('./6fc66cd42da3e8c155b22db441702cda.js'),EXPERIENCE=require('./e5bd2ea26ba0b23aa8e370d56d46c324.js'),TRACE=require('./dad33c2ec743db4fb830cd47f17c38f6.js'),Resizable=require('./ea653f45dc25181ca4f1b108175009b7.js'),tools=require('./d3976cc01aeebc5b09e11c4135b6bd8d.js'),assdkActions=require('./dca9191eced65b3831d60c02d8d487c2.js'),windowActions=require('./a8c87029da0fa06e986298d447ab0fe2.js'),simulatorActions=require('./ba23d8b47b1f4ea08b9fd49939b9443f.js'),devtoolsActions=require('./41a9b4e96ed706d28528d039c1f36b8d.js'),menuActions=require('./25d0beb4120ce2acafb4e03b95444fda.js'),idepluginMessager=require('./e9e3fd38aeedddd6db73d1d015ff6952.js'),appserviceMessager=require('./a1dd553cc059d528bb0ef56afed53968.js'),webviewPool=require('./a78e6d6a87de1708226375ca4c320d76.js'),{validType,tokenManager}=require('./dc244a5ba483ad6e0acd267d3b91b282.js'),report=require('./da7c31daaf542cf1796023d8e344b98a.js'),performanceUtils=require('./344232cd2199c9c3a024b4005d054672.js'),performanceObserver=require('./5f3c86137d346ddffec99d08c1ac2bb0.js').default,C=require('./56c390e04c10e91a4aa2a2c19d9a885d.js'),messageCenter=require('./ff946754202ecf377034d29daac7c8d9.js'),devtoolsMessager=require('./9a24eb4fb7a49d4dd24531943fc3c899.js'),networkResponseCache=require('./5d0f2b7b8c329790946b9b597749ad67.js'),systemCommand=require('./56646b0ffe5c7ea492bcc44ea72277a8.js'),log=require('./72653d4b93cdd7443296229431a7aa9a.js'),appErrCode=require('./949d8235c744ced2a80121e4dba34c28.js'),consoleDisplay=require('./2dfc6a3df6d6fc51266b293c8420e88b.js'),utilTools=require('./84b183688a46c9e2626d3e6f83365e13.js'),locales=require('./common/locales/index.js'),{weappLocalIdRegular,weappUsrFilePathPrefix,weappTmpFilePathPrefix,weappStoreFilePathPrefix}=require('./6242f55dbdfe53c2f07b7a51568311f2.js'),ABOUT_BLANK="about:blank",mapStateToProps=(a)=>{const b=a.project.current,c=a.devtools.debugger&&a.devtools.debugger.resume,d=a.devtools.debugger&&a.devtools.debugger.stepOver;return{project:b,bbsConfig:a.config.bbsConfig,popup:a.window.debug.popup,show:a.window.debug.show,isMini:!!a.window.windowStatus.mini,editorShow:a.window.editor&&a.window.editor.show,storage:b.storage&&b.storage.cache||{},debugInfo:a.simulator.debugInfo,theme:a.settings.appearance.devtoolsTheme,console:a.debug.console,webview:a.devtools.webview,restartTime:a.devtools.restartTime,debuggerResume:c,debuggerStepOver:d}},mapDispatchToProps=(a)=>({windowActions:tools.bindActionCreators(windowActions,a),assdkActions:tools.bindActionCreators(assdkActions,a),simulatorActions:tools.bindActionCreators(simulatorActions,a),devtoolsActions:tools.bindActionCreators(devtoolsActions,a),BBS:menuActions.BBS});class Devtools extends React.Component{constructor(a){super(a),this.session=Date.now(),this.newwindow=(a)=>{a.preventDefault();let b=a.targetUrl;if(b)return 0===b.indexOf(`http://127.0.0.1:${global.proxyPort}/appservice/appservice`)||`http://127.0.0.1:${global.proxyPort}/favicon.ico`===b?void 0:0!==b.indexOf("ws://")&&0!==b.indexOf("wss://")?weappLocalIdRegular.test(b)||0===b.indexOf("http://"+weappTmpFilePathPrefix+"/")||0===b.indexOf("http://"+weappStoreFilePathPrefix+"/")||0===b.indexOf("http://"+weappUsrFilePathPrefix+"/")||0===b.indexOf("/"+weappTmpFilePathPrefix+"/")||0===b.indexOf("/"+weappStoreFilePathPrefix+"/")||0===b.indexOf("/"+weappUsrFilePathPrefix+"/")||0===b.indexOf("chrome://inspect")?void nw.Window.open(b,{width:799,height:799},function(){}):0===b.indexOf("https://developers.weixin.qq.com")?0===b.indexOf("https://developers.weixin.qq.com/minigame")||0===b.indexOf("https://developers.weixin.qq.com/miniprogram")?void nw.Shell.openExternal(b):void this.props.BBS(b,C.IDE_SCENE.DEBUGGER):("https://developers.google.com/web/tools/chrome-devtools/"===b&&(b="https://developers.weixin.qq.com/miniprogram/dev/index.html"),"https://developers.google.com/web/updates/2017/05/devtools-release-notes"===b&&(b="https://developers.weixin.qq.com/miniprogram/dev/devtools/uplog.html"),"devtools://audits"===b?void devtoolsMessager.send({command:"SHOW_PANNEL",data:{name:"Audits"}}):void nw.Shell.openExternal(b)):void 0},this.onAppServiceMessage=(a)=>{const{command:b,data:c}=a;"APPSERVICE_INVOKE"===b&&"traceEvent"===c.api&&this.traceMessager.triggerOnEvent("TRACE_EVENT",{args:c.args}),"SEND_APP_DATA"===b&&this.appdataMessager.ready&&this.appdataMessager.triggerOnEvent("SEND_APP_DATA",c),"SYSTEM"===b&&this.onSystemCommand(c.api,c.data)},this.onDevtoolsMessage=(a)=>{const{command:b}=a;if("CLICK"===b&&this.devtoolsview){const a=new UIEvent("click",{bubbles:!0});this.devtoolsview._webview.dispatchEvent(a)}if("RESET_NETWORK_CACHE"===b&&networkResponseCache.clean(),"Network.getResponseBody"===a.command){const b=networkResponseCache.get(a.data.params.requestId);devtoolsMessager.send({command:"DISPATCH_MESSAGE",data:{id:a.data.id,result:{body:b.toString("base64"),base64Encoded:!0}}})}"Button.popup"===b&&this.props.windowActions.setDebuggerWindow({popup:!this.props.popup}),"THEME_MODIFIED"===b&&this.onDevtoolsThemeModified()},this.onAppDataMessage=(a)=>{const{command:b,data:c}=a;"GET_APP_DATA"===b?(this.appdataMessager.ready=!0,appserviceMessager.send({command:"GET_APP_DATA"})):"WRITE_APP_DATA"===b?appserviceMessager.send({command:"WRITE_APP_DATA",data:c}):"ON_PANEL_HIDE"===b&&(this.appdataMessager.ready=!1)},this.onStorageMessage=(a)=>{const{command:b,data:c}=a;"EXEC_STORAGE_SDK"===b?this.props.assdkActions.exec(c):"STORAGE_PANNEL_SHOW"===b?(this.storageMessager.ready=!0,this.props.assdkActions.exec({api:"getStorage",args:{},callbackID:-1})):"STORAGE_PANNEL_HIDE"===b&&(this.storageMessager.ready=!1)},this.onResizeStop=(a,b,c)=>{this.props.windowActions.setDebuggerWindow({height:c})},this.storageMessager=idepluginMessager.get("storage_miniprogram"),this.storageMessager.ready=!1,this.storageMessager.register(this.onStorageMessage),this.appdataMessager=idepluginMessager.get("appdata_miniprogram"),this.appdataMessager.ready=!1,this.appdataMessager.register(this.onAppDataMessage),this.traceMessager=idepluginMessager.get("trace_miniprogram"),devtoolsMessager.register(this.onDevtoolsMessage),appserviceMessager.register(this.onAppServiceMessage)}componentDidMount(){this.initWebview(),this.setupBBSLogWorkerListener(),this.updateBBSConfig(this.props.bbsConfig)}componentWillReceiveProps(a){if(a.storage!==this.props.storage&&this.storageMessager.triggerOnEvent("UPDATE_STORAGE",a.storage),a.debuggerResume!==this.props.debuggerResume&&devtoolsMessager.send({command:"DEBUGGER_RESUME",data:a.debugInfo}),a.debuggerStepOver!==this.props.debuggerStepOver&&devtoolsMessager.send({command:"DEBUGGER_STEP_OVER",data:a.debugInfo}),a.debugInfo!==this.props.debugInfo&&a.debugInfo&&devtoolsMessager.send({command:"DISPATCH_MESSAGE",data:a.debugInfo}),a.theme!==this.props.theme&&this.setDevtoolsTheme(),a.bbsConfig!==this.props.bbsConfig&&this.updateBBSConfig(a.bbsConfig),a.console!==this.props.console&&this.webview){const{type:b,msg:c=""}=a.console;consoleDisplay.display({command:C.DISPLAY_ACTION,type:b,data:c})}a.webview!==this.props.webview&&this.showDevTools(a.webview),a.restartTime!==this.props.restartTime&&this.restart()}componentWillUnmount(){this.devtoolsview&&this.devtoolsview.detach(),this.storageMessager.unRegister(this.onStorageMessage),this.appdataMessager.unRegister(this.onAppDataMessage),global.worker&&global.worker.bbsLogWorker&&(global.worker.bbsLogWorker.onmessage=null)}initWebview(){const a=webviewPool.get("devtools",{});this.devtoolsview&&this.devtoolsview.detach(),this.devtoolsview=a;const b=tokenManager.getSessionToken(validType.UA_TOKEN),c=`${a.originUserAgent} appservicedevtools port/${global.messageCenterPort} proxy/${global.proxyPort} token/${b} ${this.props.popup?"popup":""} ${global.isSimple?"simple":""}`;a.setUserAgentOverride(c),a.setAttribute("style","height:100%;width:100%;position:relative;display:block;"),a.on("exit",(a)=>{("abnormal"===a.reason||"crash"===a.reason||"killed"===a.reason)&&this.initWebview()}),a.on("dialog",(a)=>{a.preventDefault();const b=a.messageType,c=a.messageText,d=a.dialog;if("alert"===b){if(d.ok(),"FMP"===c)return void performanceUtils.markDevtoolsPaint();if(0<=c.indexOf("debugger:paused"))return void this.props.devtoolsActions.setDebugger({paused:!0});if(0<=c.indexOf("debugger:resumed"))return void this.props.devtoolsActions.setDebugger({paused:!1});if(0<=c.indexOf("debugger:click")){const a=c.split(":")[2];"wxml"===a?report("open_panel_wxml",!0):"appdata"===a?report("open_panel_appdata",!0):"storage"===a?report("open_panel_storage",!0):"trace"===a?report("open_panel_trace",!0):"audits"===a?report("open_panel_audits",!0):void 0}return}if("prompt"===b){if(c===C.GET_MESSAGE_TOKEN)return void d.ok(messageCenter.getToken(["APPSERVICEDEVTOOLS","PLUGIN"]));if("GET_THEME"===c)return void d.ok("dark"===this.props.theme?"dark":"default");d.ok("")}}),a.on("newwindow",this.newwindow),process.nextTick(()=>{this.showDevTools(this.props.webview)})}onWebviewDebugerEvent(a){a.on("consolemessage",(a)=>{if(a.sourceId&&/http:\/\/127\.0\.0\.1:\d+\/appservice\/__dev__\//.test(a.sourceId)&&!(1>a.level)){const b=a.message;if(b)try{this.props.bbsConfig&&global.worker.bbsLogWorker.postMessage({msgType:"evaluate",msgData:{message:a.message,context:{libVersion:this.props.project&&this.props.project.libVersion},ext:{session:this.session,level:a.level,message:a.message}}})}catch(a){log.error(a)}}}),a.onRequestErrorOccurred=(a)=>{const{type:b}=a;if("main_frame"===b&&0===a.error.indexOf("net::")&&"net::ERR_BLOCKED_BY_CLIENT"!==a.error&&"net::ERR_ABORTED"!==a.error)return void consoleDisplay.display({command:C.DISPLAY_ERROR,data:{error:{code:appErrCode.APPSERVICE_NETWORK_ERROR,details:a}}})}}showDevTools(a){if(a&&(this.webview=a),!this.webview||!this.devtoolsview)return;this.onWebviewDebugerEvent(this.webview);const b=this.devtoolsview,c=this.webview;b.attach(this.container);const d=()=>{b.off("loadstop",d);const a=()=>{c.off("loadstop",a),c.showDevTools(!0,b._webview),consoleDisplay.initWebview(c),performanceObserver.registerFirstCompileListener(),this.props.project&&this.props.project.setting&&this.props.project.setting.autoAudits?this.startAudits():this.props.simulatorActions.compile(),this.props.devtoolsActions.emitReadyEvent()};c.on("loadstop",a),c.src=ABOUT_BLANK};b.on("loadstop",d),b.src=ABOUT_BLANK}startAudits(){if(this.audits&&this.audits.getWrappedInstance)try{this.audits.getWrappedInstance().loadPanel({startAudits:!0})}catch(a){}}setDevtoolsTheme(){clearTimeout(this.setDevtoolsThemeTimer),this.setDevtoolsThemeTimer=setTimeout(()=>{const a="dark"===this.props.theme?"dark":"default";devtoolsMessager.send({command:"SET_THEME",data:a})})}onDevtoolsThemeModified(){if(!this.devtoolsview)return;const a=()=>{this.devtoolsview.off("loadstop",a),this.props.devtoolsActions.emitReloadEvent()};this.devtoolsview.on("loadstop",a),this.devtoolsview.reload()}onSystemCommand(a,b){systemCommand[a]&&systemCommand[a](b)}setupBBSLogWorkerListener(){this._bbsLogWorkerListener=(a)=>{if(a.data){if(a.data.error)return void log.error(a.data.error);try{if(a.data.ext.session!==this.session)return;const b=a.data.result.config,c=a.data.ext;consoleDisplay.display({command:C.DISPLAY_INFO,type:C.DISPLAY_TYPES.BBS_LOG_LINK,data:{messageLevel:c.level,message:c.message,explanation:b.explanation,link:b.link,linkType:b.linkType}})}catch(a){log.error(a)}}};try{global.worker.bbsLogWorker.onmessage=this._bbsLogWorkerListener}catch(a){log.error(a)}}restart(){if(this.session=Date.now(),devtoolsMessager.send({command:"DISABLE_DEBUG_AGENT",data:{}}),this.webview){const a=()=>{devtoolsMessager.send({command:"ENABLE_DEBUG_AGENT",data:{}}),this.webview.off("loadcommit",a),this.checkPluginInfo()};this.webview.on("loadcommit",a)}}updateBBSConfig(a){if(a)try{global.worker.bbsLogWorker.postMessage({msgType:"updateConfig",msgData:a})}catch(a){}}checkPluginInfo(){try{const a=this.props.project;if(a&&a.pluginInfo&&a.pluginInfo.length)for(const b of a.pluginInfo)if(b.current&&(b.latest&&"dev"!==b.current.version&&b.current.version!==b.latest.version&&consoleDisplay.display({command:C.DISPLAY_INFO,type:C.DISPLAY_TYPES.PLUGIN_UPDATE_INFO,data:{name:b.name,currentVersion:b.current.version,latestVersion:b.latest.version}}),b.onlineVersion&&b.onlineVersion!==b.current.version&&0>utilTools.compareSemVer(b.current.version,b.onlineVersion))){consoleDisplay.display({command:C.DISPLAY_ERROR,type:"none",data:{title:locales.config.PROJECT_PLUGIN_VERSION_WARNING,msg:locales.config.PROJECT_PLUGIN_VERSION_UNMATCHED_WITH_VERSION_USED_IN_ONLINE_MINI_PROGRAM.format([b.name,b.current.version,b.onlineVersion])}});continue}}catch(a){log.error(`appservice.js checkPluginInfo fail with error: ${a.toString()}`)}}renderPopUp(){const{props:a}=this;return React.createElement("div",{ref:(a)=>this.container=a,className:classNames({devtools:a.show&&!a.isMini,"ui-invisible":!a.show&&!a.isMini}),style:{width:"100%",height:"100%"}},React.createElement(WXML,null),React.createElement(SENSOR,null),React.createElement(EXPERIENCE,{ref:(a)=>this.audits=a}),React.createElement(TRACE,null),React.createElement("div",{className:"ui-divider ui-divider-horizontal",style:{pointerEvents:"none"}}))}render(){const a=this.props;if(a.popup||a.isMini)return this.renderPopUp();const b={height:a.height};return a.show&&!a.editorShow&&(b.flex="1"),React.createElement(Resizable,{innerRef:(a)=>this.container=a,width:"100%",height:a.popup?"100%":a.height,className:classNames("devtools",{"ui-invisible":!a.show}),style:b,topResizable:!0,onResizeStop:this.onResizeStop},React.createElement(WXML,null),React.createElement(SENSOR,null),React.createElement(EXPERIENCE,{ref:(a)=>this.audits=a}),React.createElement(TRACE,null),React.createElement("div",{className:"ui-divider ui-divider-horizontal",style:{pointerEvents:"none"}}))}}module.exports=connect(mapStateToProps,mapDispatchToProps,null,{withRef:!0})(Devtools);
;}(require("lazyload"), require);