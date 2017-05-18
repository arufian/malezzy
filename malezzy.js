/**
 * @license
 * malezzy.js
 * Lazy load library for all kind images
 * https://github.com/arufian/malezzy
 *
 * The MIT License
 *
 * Copyright (c) 2017 Alfian Busyro (arufian703@gmail.com)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

(function(){
	var timer = null;
	var lazyLoadStack = [];

	function calcOffset(elt) {
		var rect = elt.getBoundingClientRect(), bodyElt = document.body;

		return {
		  top: rect.top + bodyElt .scrollTop,
		  left: rect.left + bodyElt .scrollLeft
		};
	}

	function isScrolledIntoView(el) {

		var rect = el.getBoundingClientRect(), top = rect.top, height = rect.height, el = el.parentNode;
		do {
			rect = el.getBoundingClientRect();
			if (top <= rect.bottom === false) return false;
			// Check if the element is out of view due to a container scrolling
			if ((top + height) <= rect.top) return false;
			el = el.parentNode;
		} while (el != document.body);
		// Check its within the document viewport
		return top <= document.documentElement.clientHeight;

	}

	function Malezzy() {}
	
	Malezzy.prototype.addImage = function(element, container) {
		var containerList = document.querySelectorAll(container);
		if(container) {
			for (var i = 0; i < containerList.length; i++) {
				lazyLoadStack.push({
					element: containerList[i].querySelectorAll(element),
					container: containerList[i]
				});
			}
		} else {
			lazyLoadStack.push({
				element: document.querySelectorAll(element),
			});	
		}
		this.addScrollEvent();
	};

	Malezzy.prototype.loadImage = function() {
		var tmpStack = lazyLoadStack.slice();
		var self = this;
		tmpStack.map(function (tmpStackVal, i, array) {
			var element = tmpStackVal.element;
         	var isContainer = tmpStackVal.container;
         	if(isContainer) {
         		element = tmpStackVal.container;
         	}
         	if(isScrolledIntoView(element)) {
         		var lazyEl = (isContainer) ? Array.prototype.slice.call(tmpStackVal.element) : 
         			Array.prototype.slice.call(element);
         		lazyEl.map(function (val, index, array) {
				    val.setAttribute('src', val.getAttribute('data-src')); 
				});
         	}
		});
	};

	Malezzy.prototype.addScrollEvent = function() {
		var self = this;
		window.addEventListener('scroll', function(e) {
			if(lazyLoadStack.length === 0) return;
			if(timer !== null) {
		        clearTimeout(timer);
		    }
		    timer = setTimeout(function() {
		    	self.loadImage();
		    }, 300);
		});
	};

	window.Malezzy = new Malezzy();

})();