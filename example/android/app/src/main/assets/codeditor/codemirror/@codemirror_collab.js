async function moduleInitFunction(requireAsyncModule,exports={}){const module={exports:exports};var hasRequiredDist,require$$0=await requireAsyncModule("@codemirror/state"),dist={},distExports=function requireDist(){/**
	Create an instance of the collaborative editing plugin.
	*/function collab(config={}){return[collabField,collabConfig.of(Object.assign({generatedID:Math.floor(1e9*Math.random()).toString(36)},config))]}/**
	Create a transaction that represents a set of new updates received
	from the authority. Applying this transaction moves the state
	forward to adjust to the authority's view of the document.
	*/function receiveUpdates(state$1,updates){let{version,unconfirmed}=state$1.field(collabField),{clientID}=state$1.facet(collabConfig);version+=updates.length;let effects=[],changes=null,own=0;for(let update of updates){let ours=own<unconfirmed.length?unconfirmed[own]:null;ours&&ours.clientID==update.clientID?(changes&&(changes=changes.map(ours.changes,!0)),effects=state.StateEffect.mapEffects(effects,update.changes),own++):(effects=state.StateEffect.mapEffects(effects,update.changes),update.effects&&(effects=effects.concat(update.effects)),changes=changes?changes.compose(update.changes):update.changes)}if(own&&(unconfirmed=unconfirmed.slice(own)),unconfirmed.length&&(changes&&(unconfirmed=unconfirmed.map(update=>{let updateChanges=update.changes.map(changes);return changes=changes.map(update.changes,!0),new LocalUpdate(update.origin,updateChanges,state.StateEffect.mapEffects(update.effects,changes),clientID)})),effects.length)){let composed=unconfirmed.reduce((ch,u)=>ch.compose(u.changes),state.ChangeSet.empty(unconfirmed[0].changes.length));effects=state.StateEffect.mapEffects(effects,composed)}return changes?state$1.update({changes:changes,effects,annotations:[state.Transaction.addToHistory.of(!1),state.Transaction.remote.of(!0),collabReceive.of(new CollabState(version,unconfirmed))],filter:!1}):state$1.update({annotations:[collabReceive.of(new CollabState(version,unconfirmed))]})}/**
	Returns the set of locally made updates that still have to be sent
	to the authority. The returned objects will also have an `origin`
	property that points at the transaction that created them. This
	may be useful if you want to send along metadata like timestamps.
	(But note that the updates may have been mapped in the meantime,
	whereas the transaction is just the original transaction that
	created them.)
	*/function sendableUpdates(state){return state.field(collabField).unconfirmed}/**
	Get the version up to which the collab plugin has synced with the
	central authority.
	*/function getSyncedVersion(state){return state.field(collabField).version}/**
	Get this editor's collaborative editing client ID.
	*/function getClientID(state){return state.facet(collabConfig).clientID}/**
	Rebase and deduplicate an array of client-submitted updates that
	came in with an out-of-date version number. `over` should hold the
	updates that were accepted since the given version (or at least
	their change descs and client IDs). Will return an array of
	updates that, firstly, has updates that were already accepted
	filtered out, and secondly, has been moved over the other changes
	so that they apply to the current document version.
	*/function rebaseUpdates(updates,over){if(!over.length||!updates.length)return updates;let changes=null,skip=0;for(let update of over){let other=skip<updates.length?updates[skip]:null;other&&other.clientID==update.clientID?(changes&&(changes=changes.mapDesc(other.changes,!0)),skip++):changes=changes?changes.composeDesc(update.changes):update.changes}return skip&&(updates=updates.slice(skip)),changes?updates.map(update=>{let updateChanges=update.changes.map(changes);return changes=changes.mapDesc(update.changes,!0),{changes:updateChanges,effects:update.effects&&state.StateEffect.mapEffects(update.effects,changes),clientID:update.clientID}}):updates}if(hasRequiredDist)return dist;hasRequiredDist=1;var state=require$$0;class LocalUpdate{constructor(origin,changes,effects,clientID){this.origin=origin,this.changes=changes,this.effects=effects,this.clientID=clientID}}class CollabState{constructor(// The version up to which changes have been confirmed.
version,// The local updates that havent been successfully sent to the
// server yet.
unconfirmed){this.version=version,this.unconfirmed=unconfirmed}}const collabConfig=state.Facet.define({combine(configs){let combined=state.combineConfig(configs,{startVersion:0,clientID:null,sharedEffects:()=>[]},{generatedID:a=>a});return null==combined.clientID&&(combined.clientID=configs.length&&configs[0].generatedID||""),combined}}),collabReceive=state.Annotation.define(),collabField=state.StateField.define({create(state){return new CollabState(state.facet(collabConfig).startVersion,[])},update(collab,tr){let isSync=tr.annotation(collabReceive);if(isSync)return isSync;let{sharedEffects,clientID}=tr.startState.facet(collabConfig),effects=sharedEffects(tr);return effects.length||!tr.changes.empty?new CollabState(collab.version,collab.unconfirmed.concat(new LocalUpdate(tr,tr.changes,effects,clientID))):collab}});return dist.collab=collab,dist.getClientID=getClientID,dist.getSyncedVersion=getSyncedVersion,dist.rebaseUpdates=rebaseUpdates,dist.receiveUpdates=receiveUpdates,dist.sendableUpdates=sendableUpdates,dist}(),index=/*@__PURE__*/function getDefaultExportFromCjs(x){return x}(distExports);return module.exports=index,module.exports}