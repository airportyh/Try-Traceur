
goog.provide('goog.module.BaseModule'); 
goog.require('goog.Disposable'); 
goog.module.BaseModule = function() { 
  goog.Disposable.call(this); 
}; 
goog.inherits(goog.module.BaseModule, goog.Disposable); 
goog.module.BaseModule.prototype.initialize = function(context) { }; 
