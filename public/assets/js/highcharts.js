/*
 Highcharts JS v8.0.3 (2020-03-05)

 (c) 2009-2018 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (aa, S) {
    "object" === typeof module && module.exports ? (S["default"] = S, module.exports = aa.document ? S(aa) : S) : "function" === typeof define && define.amd ? define("highcharts/highcharts", function () {
        return S(aa)
    }) : (aa.Highcharts && aa.Highcharts.error(16, !0), aa.Highcharts = S(aa))
})("undefined" !== typeof window ? window : this, function (aa) {
    function S(d, g, W, v) {
        d.hasOwnProperty(g) || (d[g] = v.apply(null, W))
    }
    var r = {};
    S(r, "parts/Globals.js", [], function () {
        var d = "undefined" !== typeof aa ? aa : "undefined" !== typeof window ? window : {},
            g = d.document,
            W = d.navigator && d.navigator.userAgent || "",
            v = g && g.createElementNS && !!g.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect,
            r = /(edge|msie|trident)/i.test(W) && !d.opera,
            M = -1 !== W.indexOf("Firefox"),
            E = -1 !== W.indexOf("Chrome"),
            A = M && 4 > parseInt(W.split("Firefox/")[1], 10);
        return {
            product: "Highcharts",
            version: "8.0.3",
            deg2rad: 2 * Math.PI / 360,
            doc: g,
            hasBidiBug: A,
            hasTouch: !!d.TouchEvent,
            isMS: r,
            isWebKit: -1 !== W.indexOf("AppleWebKit"),
            isFirefox: M,
            isChrome: E,
            isSafari: !E && -1 !== W.indexOf("Safari"),
            isTouchDevice: /(Mobile|Android|Windows Phone)/.test(W),
            SVG_NS: "http://www.w3.org/2000/svg",
            chartCount: 0,
            seriesTypes: {},
            symbolSizes: {},
            svg: v,
            win: d,
            marginNames: ["plotTop", "marginRight", "marginBottom", "plotLeft"],
            noop: function () {},
            charts: [],
            dateFormats: {}
        }
    });
    S(r, "parts/Utilities.js", [r["parts/Globals.js"]], function (d) {
        function g() {
            var b, a = arguments,
                p = {},
                e = function (b, a) {
                    "object" !== typeof b && (b = {});
                    Y(a, function (p, c) {
                        !h(p, !0) || q(p) || N(p) ? b[c] = a[c] : b[c] = e(b[c] || {}, p)
                    });
                    return b
                };
            !0 === a[0] && (p = a[1], a = Array.prototype.slice.call(a,
                2));
            var c = a.length;
            for (b = 0; b < c; b++) p = e(p, a[b]);
            return p
        }

        function W(b, a, p) {
            var e;
            u(a) ? c(p) ? b.setAttribute(a, p) : b && b.getAttribute && ((e = b.getAttribute(a)) || "class" !== a || (e = b.getAttribute(a + "Name"))) : Y(a, function (a, p) {
                b.setAttribute(p, a)
            });
            return e
        }

        function v() {
            for (var b = arguments, a = b.length, p = 0; p < a; p++) {
                var e = b[p];
                if ("undefined" !== typeof e && null !== e) return e
            }
        }

        function r(b, a) {
            if (!b) return a;
            var p = b.split(".").reverse();
            if (1 === p.length) return a[b];
            for (b = p.pop();
                "undefined" !== typeof b && "undefined" !== typeof a &&
                null !== a;) a = a[b], b = p.pop();
            return a
        }
        d.timers = [];
        var M = d.charts,
            E = d.doc,
            A = d.win,
            F = d.error = function (b, a, p, e) {
                var c = P(b),
                    n = c ? "Highcharts error #" + b + ": www.highcharts.com/errors/" + b + "/" : b.toString(),
                    w = function () {
                        if (a) throw Error(n);
                        A.console && console.log(n)
                    };
                if ("undefined" !== typeof e) {
                    var f = "";
                    c && (n += "?");
                    d.objectEach(e, function (b, a) {
                        f += "\n" + a + ": " + b;
                        c && (n += encodeURI(a) + "=" + encodeURI(b))
                    });
                    n += f
                }
                p ? d.fireEvent(p, "displayError", {
                    code: b,
                    message: n,
                    params: e
                }, w) : w()
            },
            L = function () {
                function b(b, a, p) {
                    this.options =
                        a;
                    this.elem = b;
                    this.prop = p
                }
                b.prototype.dSetter = function () {
                    var b = this.paths[0],
                        a = this.paths[1],
                        p = [],
                        e = this.now,
                        c = b.length;
                    if (1 === e) p = this.toD;
                    else if (c === a.length && 1 > e)
                        for (; c--;) {
                            var n = parseFloat(b[c]);
                            p[c] = isNaN(n) || "A" === a[c - 4] || "A" === a[c - 5] ? a[c] : e * parseFloat("" + (a[c] - n)) + n
                        } else p = a;
                    this.elem.attr("d", p, null, !0)
                };
                b.prototype.update = function () {
                    var b = this.elem,
                        a = this.prop,
                        p = this.now,
                        e = this.options.step;
                    if (this[a + "Setter"]) this[a + "Setter"]();
                    else b.attr ? b.element && b.attr(a, p, null, !0) : b.style[a] = p + this.unit;
                    e && e.call(b, p, this)
                };
                b.prototype.run = function (b, a, p) {
                    var e = this,
                        c = e.options,
                        n = function (b) {
                            return n.stopped ? !1 : e.step(b)
                        },
                        w = A.requestAnimationFrame || function (b) {
                            setTimeout(b, 13)
                        },
                        f = function () {
                            for (var b = 0; b < d.timers.length; b++) d.timers[b]() || d.timers.splice(b--, 1);
                            d.timers.length && w(f)
                        };
                    b !== a || this.elem["forceAnimate:" + this.prop] ? (this.startTime = +new Date, this.start = b, this.end = a, this.unit = p, this.now = this.start, this.pos = 0, n.elem = this.elem, n.prop = this.prop, n() && 1 === d.timers.push(n) && w(f)) : (delete c.curAnim[this.prop],
                        c.complete && 0 === Object.keys(c.curAnim).length && c.complete.call(this.elem))
                };
                b.prototype.step = function (b) {
                    var a = +new Date,
                        p = this.options,
                        e = this.elem,
                        c = p.complete,
                        n = p.duration,
                        w = p.curAnim;
                    if (e.attr && !e.element) b = !1;
                    else if (b || a >= n + this.startTime) {
                        this.now = this.end;
                        this.pos = 1;
                        this.update();
                        var f = w[this.prop] = !0;
                        Y(w, function (b) {
                            !0 !== b && (f = !1)
                        });
                        f && c && c.call(e);
                        b = !1
                    } else this.pos = p.easing((a - this.startTime) / n), this.now = this.start + (this.end - this.start) * this.pos, this.update(), b = !0;
                    return b
                };
                b.prototype.initPath =
                    function (b, a, p) {
                        function e(b) {
                            for (C = b.length; C--;) {
                                var a = "M" === b[C] || "L" === b[C];
                                var p = /[a-zA-Z]/.test(b[C + 3]);
                                a && p && b.splice(C + 1, 0, b[C + 1], b[C + 2], b[C + 1], b[C + 2])
                            }
                        }

                        function c(b, a) {
                            for (; b.length < V;) {
                                b[0] = a[V - b.length];
                                var p = b.slice(0, T);
                                [].splice.apply(b, [0, 0].concat(p));
                                k && (p = b.slice(b.length - T), [].splice.apply(b, [b.length, 0].concat(p)), C--)
                            }
                            b[0] = "M"
                        }

                        function n(b, a) {
                            for (var p = (V - b.length) / T; 0 < p && p--;) l = b.slice().splice(b.length / x - T, T * x), l[0] = a[V - T - p * T], G && (l[T - 6] = l[T - 2], l[T - 5] = l[T - 1]), [].splice.apply(b,
                                [b.length / x, 0].concat(l)), k && p--
                        }
                        a = a || "";
                        var w = b.startX,
                            f = b.endX,
                            G = -1 < a.indexOf("C"),
                            T = G ? 7 : 3,
                            l, C;
                        a = a.split(" ");
                        p = p.slice();
                        var k = b.isArea,
                            x = k ? 2 : 1;
                        G && (e(a), e(p));
                        if (w && f) {
                            for (C = 0; C < w.length; C++)
                                if (w[C] === f[0]) {
                                    var m = C;
                                    break
                                } else if (w[0] === f[f.length - w.length + C]) {
                                m = C;
                                var t = !0;
                                break
                            } else if (w[w.length - 1] === f[f.length - w.length + C]) {
                                m = w.length - C;
                                break
                            }
                            "undefined" === typeof m && (a = [])
                        }
                        if (a.length && P(m)) {
                            var V = p.length + m * x * T;
                            t ? (c(a, p), n(p, a)) : (c(p, a), n(a, p))
                        }
                        return [a, p]
                    };
                b.prototype.fillSetter = function () {
                    d.Fx.prototype.strokeSetter.apply(this,
                        arguments)
                };
                b.prototype.strokeSetter = function () {
                    this.elem.attr(this.prop, d.color(this.start).tweenTo(d.color(this.end), this.pos), null, !0)
                };
                return b
            }();
        d.Fx = L;
        d.merge = g;
        var y = d.pInt = function (b, a) {
                return parseInt(b, a || 10)
            },
            u = d.isString = function (b) {
                return "string" === typeof b
            },
            D = d.isArray = function (b) {
                b = Object.prototype.toString.call(b);
                return "[object Array]" === b || "[object Array Iterator]" === b
            },
            h = d.isObject = function (b, a) {
                return !!b && "object" === typeof b && (!a || !D(b))
            },
            N = d.isDOMElement = function (b) {
                return h(b) &&
                    "number" === typeof b.nodeType
            },
            q = d.isClass = function (b) {
                var a = b && b.constructor;
                return !(!h(b, !0) || N(b) || !a || !a.name || "Object" === a.name)
            },
            P = d.isNumber = function (b) {
                return "number" === typeof b && !isNaN(b) && Infinity > b && -Infinity < b
            },
            f = d.erase = function (b, a) {
                for (var p = b.length; p--;)
                    if (b[p] === a) {
                        b.splice(p, 1);
                        break
                    }
            },
            c = d.defined = function (b) {
                return "undefined" !== typeof b && null !== b
            };
        d.attr = W;
        var k = d.splat = function (b) {
                return D(b) ? b : [b]
            },
            m = d.syncTimeout = function (b, a, p) {
                if (0 < a) return setTimeout(b, a, p);
                b.call(0, p);
                return -1
            },
            e = d.clearTimeout = function (b) {
                c(b) && clearTimeout(b)
            },
            a = d.extend = function (b, a) {
                var p;
                b || (b = {});
                for (p in a) b[p] = a[p];
                return b
            };
        d.pick = v;
        var l = d.css = function (b, p) {
                d.isMS && !d.svg && p && "undefined" !== typeof p.opacity && (p.filter = "alpha(opacity=" + 100 * p.opacity + ")");
                a(b.style, p)
            },
            t = d.createElement = function (b, p, e, c, n) {
                b = E.createElement(b);
                p && a(b, p);
                n && l(b, {
                    padding: "0",
                    border: "none",
                    margin: "0"
                });
                e && l(b, e);
                c && c.appendChild(b);
                return b
            },
            z = d.extendClass = function (b, p) {
                var e = function () {};
                e.prototype = new b;
                a(e.prototype,
                    p);
                return e
            },
            x = d.pad = function (b, a, p) {
                return Array((a || 2) + 1 - String(b).replace("-", "").length).join(p || "0") + b
            },
            B = d.relativeLength = function (b, a, p) {
                return /%$/.test(b) ? a * parseFloat(b) / 100 + (p || 0) : parseFloat(b)
            },
            H = d.wrap = function (b, a, p) {
                var e = b[a];
                b[a] = function () {
                    var b = Array.prototype.slice.call(arguments),
                        a = arguments,
                        c = this;
                    c.proceed = function () {
                        e.apply(c, arguments.length ? arguments : a)
                    };
                    b.unshift(e);
                    b = p.apply(this, b);
                    c.proceed = null;
                    return b
                }
            },
            Q = d.format = function (b, a, p) {
                var e = "{",
                    c = !1,
                    n = [],
                    w = /f$/,
                    f = /\.([0-9])/,
                    G = d.defaultOptions.lang,
                    l = p && p.time || d.time;
                for (p = p && p.numberFormatter || T; b;) {
                    var C = b.indexOf(e);
                    if (-1 === C) break;
                    var k = b.slice(0, C);
                    if (c) {
                        k = k.split(":");
                        e = r(k.shift() || "", a);
                        if (k.length && "number" === typeof e)
                            if (k = k.join(":"), w.test(k)) {
                                var x = parseInt((k.match(f) || ["", "-1"])[1], 10);
                                null !== e && (e = p(e, x, G.decimalPoint, -1 < k.indexOf(",") ? G.thousandsSep : ""))
                            } else e = l.dateFormat(k, e);
                        n.push(e)
                    } else n.push(k);
                    b = b.slice(C + 1);
                    e = (c = !c) ? "}" : "{"
                }
                n.push(b);
                return n.join("")
            },
            I = d.getMagnitude = function (b) {
                return Math.pow(10,
                    Math.floor(Math.log(b) / Math.LN10))
            },
            K = d.normalizeTickInterval = function (b, a, p, e, c) {
                var n = b;
                p = v(p, 1);
                var w = b / p;
                a || (a = c ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10], !1 === e && (1 === p ? a = a.filter(function (b) {
                    return 0 === b % 1
                }) : .1 >= p && (a = [1 / p])));
                for (e = 0; e < a.length && !(n = a[e], c && n * p >= b || !c && w <= (a[e] + (a[e + 1] || a[e])) / 2); e++);
                return n = O(n * p, -Math.round(Math.log(.001) / Math.LN10))
            },
            n = d.stableSort = function (b, a) {
                var p = b.length,
                    e, c;
                for (c = 0; c < p; c++) b[c].safeI = c;
                b.sort(function (b, p) {
                    e = a(b, p);
                    return 0 === e ? b.safeI - p.safeI :
                        e
                });
                for (c = 0; c < p; c++) delete b[c].safeI
            },
            b = d.arrayMin = function (b) {
                for (var a = b.length, p = b[0]; a--;) b[a] < p && (p = b[a]);
                return p
            },
            C = d.arrayMax = function (b) {
                for (var a = b.length, p = b[0]; a--;) b[a] > p && (p = b[a]);
                return p
            },
            w = d.destroyObjectProperties = function (b, a) {
                Y(b, function (p, e) {
                    p && p !== a && p.destroy && p.destroy();
                    delete b[e]
                })
            },
            R = d.discardElement = function (b) {
                var a = d.garbageBin;
                a || (a = t("div"));
                b && a.appendChild(b);
                a.innerHTML = ""
            },
            O = d.correctFloat = function (b, a) {
                return parseFloat(b.toPrecision(a || 14))
            },
            X = d.setAnimation =
            function (b, a) {
                a.renderer.globalAnimation = v(b, a.options.chart.animation, !0)
            },
            U = d.animObject = function (b) {
                return h(b) ? g(b) : {
                    duration: b ? 500 : 0
                }
            },
            p = d.timeUnits = {
                millisecond: 1,
                second: 1E3,
                minute: 6E4,
                hour: 36E5,
                day: 864E5,
                week: 6048E5,
                month: 24192E5,
                year: 314496E5
            },
            T = d.numberFormat = function (b, a, p, e) {
                b = +b || 0;
                a = +a;
                var c = d.defaultOptions.lang,
                    n = (b.toString().split(".")[1] || "").split("e")[0].length,
                    w = b.toString().split("e");
                if (-1 === a) a = Math.min(n, 20);
                else if (!P(a)) a = 2;
                else if (a && w[1] && 0 > w[1]) {
                    var f = a + +w[1];
                    0 <= f ? (w[0] =
                        (+w[0]).toExponential(f).split("e")[0], a = f) : (w[0] = w[0].split(".")[0] || 0, b = 20 > a ? (w[0] * Math.pow(10, w[1])).toFixed(a) : 0, w[1] = 0)
                }
                var G = (Math.abs(w[1] ? w[0] : b) + Math.pow(10, -Math.max(a, n) - 1)).toFixed(a);
                n = String(y(G));
                f = 3 < n.length ? n.length % 3 : 0;
                p = v(p, c.decimalPoint);
                e = v(e, c.thousandsSep);
                b = (0 > b ? "-" : "") + (f ? n.substr(0, f) + e : "");
                b += n.substr(f).replace(/(\d{3})(?=\d)/g, "$1" + e);
                a && (b += p + G.slice(-a));
                w[1] && 0 !== +b && (b += "e" + w[1]);
                return b
            };
        Math.easeInOutSine = function (b) {
            return -.5 * (Math.cos(Math.PI * b) - 1)
        };
        var Z = d.getStyle =
            function (b, a, p) {
                if ("width" === a) return a = Math.min(b.offsetWidth, b.scrollWidth), p = b.getBoundingClientRect && b.getBoundingClientRect().width, p < a && p >= a - 1 && (a = Math.floor(p)), Math.max(0, a - d.getStyle(b, "padding-left") - d.getStyle(b, "padding-right"));
                if ("height" === a) return Math.max(0, Math.min(b.offsetHeight, b.scrollHeight) - d.getStyle(b, "padding-top") - d.getStyle(b, "padding-bottom"));
                A.getComputedStyle || F(27, !0);
                if (b = A.getComputedStyle(b, void 0)) b = b.getPropertyValue(a), v(p, "opacity" !== a) && (b = y(b));
                return b
            },
            ca = d.inArray = function (b, a, p) {
                return a.indexOf(b, p)
            },
            G = d.find = Array.prototype.find ? function (b, a) {
                return b.find(a)
            } : function (b, a) {
                var p, e = b.length;
                for (p = 0; p < e; p++)
                    if (a(b[p], p)) return b[p]
            };
        d.keys = Object.keys;
        var V = d.offset = function (b) {
                var a = E.documentElement;
                b = b.parentElement || b.parentNode ? b.getBoundingClientRect() : {
                    top: 0,
                    left: 0
                };
                return {
                    top: b.top + (A.pageYOffset || a.scrollTop) - (a.clientTop || 0),
                    left: b.left + (A.pageXOffset || a.scrollLeft) - (a.clientLeft || 0)
                }
            },
            ba = d.stop = function (b, a) {
                for (var p = d.timers.length; p--;) d.timers[p].elem !==
                    b || a && a !== d.timers[p].prop || (d.timers[p].stopped = !0)
            },
            Y = d.objectEach = function (b, a, p) {
                for (var e in b) Object.hasOwnProperty.call(b, e) && a.call(p || b[e], b[e], e, b)
            };
        Y({
            map: "map",
            each: "forEach",
            grep: "filter",
            reduce: "reduce",
            some: "some"
        }, function (b, a) {
            d[a] = function (a) {
                return Array.prototype[b].apply(a, [].slice.call(arguments, 1))
            }
        });
        var fa = d.addEvent = function (b, a, p, e) {
                void 0 === e && (e = {});
                var c = b.addEventListener || d.addEventListenerPolyfill;
                var n = "function" === typeof b && b.prototype ? b.prototype.protoEvents = b.prototype.protoEvents || {} : b.hcEvents = b.hcEvents || {};
                d.Point && b instanceof d.Point && b.series && b.series.chart && (b.series.chart.runTrackerClick = !0);
                c && c.call(b, a, p, !1);
                n[a] || (n[a] = []);
                n[a].push({
                    fn: p,
                    order: "number" === typeof e.order ? e.order : Infinity
                });
                n[a].sort(function (b, a) {
                    return b.order - a.order
                });
                return function () {
                    da(b, a, p)
                }
            },
            da = d.removeEvent = function (b, a, p) {
                function e(a, p) {
                    var e = b.removeEventListener || d.removeEventListenerPolyfill;
                    e && e.call(b, a, p, !1)
                }

                function c(p) {
                    var c;
                    if (b.nodeName) {
                        if (a) {
                            var n = {};
                            n[a] = !0
                        } else n = p;
                        Y(n,
                            function (b, a) {
                                if (p[a])
                                    for (c = p[a].length; c--;) e(a, p[a][c].fn)
                            })
                    }
                }
                var n;
                ["protoEvents", "hcEvents"].forEach(function (w, f) {
                    var G = (f = f ? b : b.prototype) && f[w];
                    G && (a ? (n = G[a] || [], p ? (G[a] = n.filter(function (b) {
                        return p !== b.fn
                    }), e(a, p)) : (c(G), G[a] = [])) : (c(G), f[w] = {}))
                })
            },
            ha = d.fireEvent = function (b, p, e, c) {
                var n;
                e = e || {};
                if (E.createEvent && (b.dispatchEvent || b.fireEvent)) {
                    var w = E.createEvent("Events");
                    w.initEvent(p, !0, !0);
                    a(w, e);
                    b.dispatchEvent ? b.dispatchEvent(w) : b.fireEvent(p, w)
                } else e.target || a(e, {
                        preventDefault: function () {
                            e.defaultPrevented = !0
                        },
                        target: b,
                        type: p
                    }),
                    function (a, p) {
                        void 0 === a && (a = []);
                        void 0 === p && (p = []);
                        var c = 0,
                            w = 0,
                            f = a.length + p.length;
                        for (n = 0; n < f; n++) !1 === (a[c] ? p[w] ? a[c].order <= p[w].order ? a[c++] : p[w++] : a[c++] : p[w++]).fn.call(b, e) && e.preventDefault()
                    }(b.protoEvents && b.protoEvents[p], b.hcEvents && b.hcEvents[p]);
                c && !e.defaultPrevented && c.call(b, e)
            },
            ia = d.animate = function (b, a, p) {
                var e, c = "",
                    n, w;
                if (!h(p)) {
                    var f = arguments;
                    p = {
                        duration: f[2],
                        easing: f[3],
                        complete: f[4]
                    }
                }
                P(p.duration) || (p.duration = 400);
                p.easing = "function" === typeof p.easing ?
                    p.easing : Math[p.easing] || Math.easeInOutSine;
                p.curAnim = g(a);
                Y(a, function (f, G) {
                    ba(b, G);
                    w = new L(b, p, G);
                    n = null;
                    "d" === G ? (w.paths = w.initPath(b, b.d, a.d), w.toD = a.d, e = 0, n = 1) : b.attr ? e = b.attr(G) : (e = parseFloat(Z(b, G)) || 0, "opacity" !== G && (c = "px"));
                    n || (n = f);
                    n && n.match && n.match("px") && (n = n.replace(/px/g, ""));
                    w.run(e, n, c)
                })
            },
            ja = d.seriesType = function (b, a, p, e, c) {
                var n = d.getOptions(),
                    w = d.seriesTypes;
                n.plotOptions[b] = g(n.plotOptions[a], p);
                w[b] = z(w[a] || function () {}, e);
                w[b].prototype.type = b;
                c && (w[b].prototype.pointClass =
                    z(d.Point, c));
                return w[b]
            },
            ea = d.uniqueKey = function () {
                var b = Math.random().toString(36).substring(2, 9),
                    a = 0;
                return function () {
                    return "highcharts-" + b + "-" + a++
                }
            }(),
            ka = d.isFunction = function (b) {
                return "function" === typeof b
            };
        A.jQuery && (A.jQuery.fn.highcharts = function () {
            var b = [].slice.call(arguments);
            if (this[0]) return b[0] ? (new(d[u(b[0]) ? b.shift() : "Chart"])(this[0], b[0], b[1]), this) : M[W(this[0], "data-highcharts-chart")]
        });
        return {
            Fx: L,
            addEvent: fa,
            animate: ia,
            animObject: U,
            arrayMax: C,
            arrayMin: b,
            attr: W,
            clamp: function (b,
                a, p) {
                return b > a ? b < p ? b : p : a
            },
            clearTimeout: e,
            correctFloat: O,
            createElement: t,
            css: l,
            defined: c,
            destroyObjectProperties: w,
            discardElement: R,
            erase: f,
            error: F,
            extend: a,
            extendClass: z,
            find: G,
            fireEvent: ha,
            format: Q,
            getMagnitude: I,
            getNestedProperty: r,
            getStyle: Z,
            inArray: ca,
            isArray: D,
            isClass: q,
            isDOMElement: N,
            isFunction: ka,
            isNumber: P,
            isObject: h,
            isString: u,
            merge: g,
            normalizeTickInterval: K,
            numberFormat: T,
            objectEach: Y,
            offset: V,
            pad: x,
            pick: v,
            pInt: y,
            relativeLength: B,
            removeEvent: da,
            seriesType: ja,
            setAnimation: X,
            splat: k,
            stableSort: n,
            stop: ba,
            syncTimeout: m,
            timeUnits: p,
            uniqueKey: ea,
            wrap: H
        }
    });
    S(r, "parts/Color.js", [r["parts/Globals.js"], r["parts/Utilities.js"]], function (d, g) {
        var W = g.isNumber,
            v = g.merge,
            r = g.pInt;
        g = function () {
            function d(g) {
                this.parsers = [{
                    regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
                    parse: function (d) {
                        return [r(d[1]), r(d[2]), r(d[3]), parseFloat(d[4], 10)]
                    }
                }, {
                    regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
                    parse: function (d) {
                        return [r(d[1]), r(d[2]),
                            r(d[3]), 1
                        ]
                    }
                }];
                this.rgba = [];
                if (!(this instanceof d)) return new d(g);
                this.init(g)
            }
            d.parse = function (g) {
                return new d(g)
            };
            d.prototype.init = function (g) {
                var A, F;
                if ((this.input = g = d.names[g && g.toLowerCase ? g.toLowerCase() : ""] || g) && g.stops) this.stops = g.stops.map(function (u) {
                    return new d(u[1])
                });
                else {
                    if (g && g.charAt && "#" === g.charAt()) {
                        var v = g.length;
                        g = parseInt(g.substr(1), 16);
                        7 === v ? A = [(g & 16711680) >> 16, (g & 65280) >> 8, g & 255, 1] : 4 === v && (A = [(g & 3840) >> 4 | (g & 3840) >> 8, (g & 240) >> 4 | g & 240, (g & 15) << 4 | g & 15, 1])
                    }
                    if (!A)
                        for (F = this.parsers.length; F-- &&
                            !A;) {
                            var y = this.parsers[F];
                            (v = y.regex.exec(g)) && (A = y.parse(v))
                        }
                }
                this.rgba = A || []
            };
            d.prototype.get = function (d) {
                var g = this.input,
                    F = this.rgba;
                if ("undefined" !== typeof this.stops) {
                    var E = v(g);
                    E.stops = [].concat(E.stops);
                    this.stops.forEach(function (g, u) {
                        E.stops[u] = [E.stops[u][0], g.get(d)]
                    })
                } else E = F && W(F[0]) ? "rgb" === d || !d && 1 === F[3] ? "rgb(" + F[0] + "," + F[1] + "," + F[2] + ")" : "a" === d ? F[3] : "rgba(" + F.join(",") + ")" : g;
                return E
            };
            d.prototype.brighten = function (d) {
                var g, v = this.rgba;
                if (this.stops) this.stops.forEach(function (g) {
                    g.brighten(d)
                });
                else if (W(d) && 0 !== d)
                    for (g = 0; 3 > g; g++) v[g] += r(255 * d), 0 > v[g] && (v[g] = 0), 255 < v[g] && (v[g] = 255);
                return this
            };
            d.prototype.setOpacity = function (d) {
                this.rgba[3] = d;
                return this
            };
            d.prototype.tweenTo = function (d, g) {
                var v = this.rgba,
                    A = d.rgba;
                A.length && v && v.length ? (d = 1 !== A[3] || 1 !== v[3], g = (d ? "rgba(" : "rgb(") + Math.round(A[0] + (v[0] - A[0]) * (1 - g)) + "," + Math.round(A[1] + (v[1] - A[1]) * (1 - g)) + "," + Math.round(A[2] + (v[2] - A[2]) * (1 - g)) + (d ? "," + (A[3] + (v[3] - A[3]) * (1 - g)) : "") + ")") : g = d.input || "none";
                return g
            };
            d.names = {
                white: "#ffffff",
                black: "#000000"
            };
            return d
        }();
        d.Color = g;
        d.color = g.parse;
        return d.Color
    });
    S(r, "parts/SvgRenderer.js", [r["parts/Globals.js"], r["parts/Color.js"], r["parts/Utilities.js"]], function (d, g, r) {
        var v = g.parse,
            J = r.addEvent,
            M = r.animate,
            E = r.animObject,
            A = r.attr,
            F = r.createElement,
            L = r.css,
            y = r.defined,
            u = r.destroyObjectProperties,
            D = r.erase,
            h = r.extend,
            N = r.inArray,
            q = r.isArray,
            P = r.isNumber,
            f = r.isObject,
            c = r.isString,
            k = r.merge,
            m = r.objectEach,
            e = r.pick,
            a = r.pInt,
            l = r.removeEvent,
            t = r.splat,
            z = r.stop,
            x = r.uniqueKey,
            B = d.charts,
            H = d.deg2rad,
            Q = d.doc,
            I = d.hasTouch,
            K = d.isFirefox,
            n = d.isMS,
            b = d.isWebKit,
            C = d.noop,
            w = d.svg,
            R = d.SVG_NS,
            O = d.symbolSizes,
            X = d.win;
        var U = d.SVGElement = function () {
            return this
        };
        h(U.prototype, {
            opacity: 1,
            SVG_NS: R,
            textProps: "direction fontSize fontWeight fontFamily fontStyle color lineHeight width textAlign textDecoration textOverflow textOutline cursor".split(" "),
            init: function (b, a) {
                this.element = "span" === a ? F(a) : Q.createElementNS(this.SVG_NS, a);
                this.renderer = b;
                d.fireEvent(this, "afterInit")
            },
            animate: function (b, a, c) {
                var p = E(e(a, this.renderer.globalAnimation,
                    !0));
                e(Q.hidden, Q.msHidden, Q.webkitHidden, !1) && (p.duration = 0);
                0 !== p.duration ? (c && (p.complete = c), M(this, b, p)) : (this.attr(b, void 0, c), m(b, function (b, a) {
                    p.step && p.step.call(this, b, {
                        prop: a,
                        pos: 1
                    })
                }, this));
                return this
            },
            complexColor: function (b, a, e) {
                var p = this.renderer,
                    c, n, w, f, T, l, C, t, z, Z, O, R = [],
                    B;
                d.fireEvent(this.renderer, "complexColor", {
                    args: arguments
                }, function () {
                    b.radialGradient ? n = "radialGradient" : b.linearGradient && (n = "linearGradient");
                    n && (w = b[n], T = p.gradients, C = b.stops, Z = e.radialReference, q(w) && (b[n] =
                        w = {
                            x1: w[0],
                            y1: w[1],
                            x2: w[2],
                            y2: w[3],
                            gradientUnits: "userSpaceOnUse"
                        }), "radialGradient" === n && Z && !y(w.gradientUnits) && (f = w, w = k(w, p.getRadialAttr(Z, f), {
                        gradientUnits: "userSpaceOnUse"
                    })), m(w, function (b, a) {
                        "id" !== a && R.push(a, b)
                    }), m(C, function (b) {
                        R.push(b)
                    }), R = R.join(","), T[R] ? O = T[R].attr("id") : (w.id = O = x(), T[R] = l = p.createElement(n).attr(w).add(p.defs), l.radAttr = f, l.stops = [], C.forEach(function (b) {
                        0 === b[1].indexOf("rgba") ? (c = v(b[1]), t = c.get("rgb"), z = c.get("a")) : (t = b[1], z = 1);
                        b = p.createElement("stop").attr({
                            offset: b[0],
                            "stop-color": t,
                            "stop-opacity": z
                        }).add(l);
                        l.stops.push(b)
                    })), B = "url(" + p.url + "#" + O + ")", e.setAttribute(a, B), e.gradient = R, b.toString = function () {
                        return B
                    })
                })
            },
            applyTextOutline: function (b) {
                var a = this.element,
                    p; - 1 !== b.indexOf("contrast") && (b = b.replace(/contrast/g, this.renderer.getContrast(a.style.fill)));
                b = b.split(" ");
                var e = b[b.length - 1];
                if ((p = b[0]) && "none" !== p && d.svg) {
                    this.fakeTS = !0;
                    b = [].slice.call(a.getElementsByTagName("tspan"));
                    this.ySetter = this.xSetter;
                    p = p.replace(/(^[\d\.]+)(.*?)$/g, function (b, a,
                        p) {
                        return 2 * a + p
                    });
                    this.removeTextOutline(b);
                    var c = a.textContent ? /^[\u0591-\u065F\u066A-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/.test(a.textContent) : !1;
                    var n = a.firstChild;
                    b.forEach(function (b, w) {
                        0 === w && (b.setAttribute("x", a.getAttribute("x")), w = a.getAttribute("y"), b.setAttribute("y", w || 0), null === w && a.setAttribute("y", 0));
                        w = b.cloneNode(!0);
                        A(c && !K ? b : w, {
                            "class": "highcharts-text-outline",
                            fill: e,
                            stroke: e,
                            "stroke-width": p,
                            "stroke-linejoin": "round"
                        });
                        a.insertBefore(w, n)
                    });
                    c && K && b[0] && (b = b[0].cloneNode(!0), b.textContent =
                        " ", a.insertBefore(b, n))
                }
            },
            removeTextOutline: function (b) {
                for (var a = b.length, p; a--;) p = b[a], "highcharts-text-outline" === p.getAttribute("class") && D(b, this.element.removeChild(p))
            },
            symbolCustomAttribs: "x y width height r start end innerR anchorX anchorY rounded".split(" "),
            attr: function (b, a, e, c) {
                var p = this.element,
                    n, w = this,
                    f, l, C = this.symbolCustomAttribs;
                if ("string" === typeof b && "undefined" !== typeof a) {
                    var T = b;
                    b = {};
                    b[T] = a
                }
                "string" === typeof b ? w = (this[b + "Getter"] || this._defaultGetter).call(this, b, p) : (m(b,
                    function (a, e) {
                        f = !1;
                        c || z(this, e);
                        this.symbolName && -1 !== N(e, C) && (n || (this.symbolAttr(b), n = !0), f = !0);
                        !this.rotation || "x" !== e && "y" !== e || (this.doTransform = !0);
                        f || (l = this[e + "Setter"] || this._defaultSetter, l.call(this, a, e, p), !this.styledMode && this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(e) && this.updateShadows(e, a, l))
                    }, this), this.afterSetters());
                e && e.call(this);
                return w
            },
            afterSetters: function () {
                this.doTransform && (this.updateTransform(), this.doTransform = !1)
            },
            updateShadows: function (b,
                a, e) {
                for (var p = this.shadows, c = p.length; c--;) e.call(p[c], "height" === b ? Math.max(a - (p[c].cutHeight || 0), 0) : "d" === b ? this.d : a, b, p[c])
            },
            addClass: function (b, a) {
                var p = a ? "" : this.attr("class") || "";
                b = (b || "").split(/ /g).reduce(function (b, a) {
                    -1 === p.indexOf(a) && b.push(a);
                    return b
                }, p ? [p] : []).join(" ");
                b !== p && this.attr("class", b);
                return this
            },
            hasClass: function (b) {
                return -1 !== (this.attr("class") || "").split(" ").indexOf(b)
            },
            removeClass: function (b) {
                return this.attr("class", (this.attr("class") || "").replace(c(b) ? new RegExp(" ?" +
                    b + " ?") : b, ""))
            },
            symbolAttr: function (b) {
                var a = this;
                "x y r start end width height innerR anchorX anchorY clockwise".split(" ").forEach(function (p) {
                    a[p] = e(b[p], a[p])
                });
                a.attr({
                    d: a.renderer.symbols[a.symbolName](a.x, a.y, a.width, a.height, a)
                })
            },
            clip: function (b) {
                return this.attr("clip-path", b ? "url(" + this.renderer.url + "#" + b.id + ")" : "none")
            },
            crisp: function (b, a) {
                a = a || b.strokeWidth || 0;
                var p = Math.round(a) % 2 / 2;
                b.x = Math.floor(b.x || this.x || 0) + p;
                b.y = Math.floor(b.y || this.y || 0) + p;
                b.width = Math.floor((b.width || this.width ||
                    0) - 2 * p);
                b.height = Math.floor((b.height || this.height || 0) - 2 * p);
                y(b.strokeWidth) && (b.strokeWidth = a);
                return b
            },
            css: function (b) {
                var p = this.styles,
                    e = {},
                    c = this.element,
                    n = "",
                    f = !p,
                    l = ["textOutline", "textOverflow", "width"];
                b && b.color && (b.fill = b.color);
                p && m(b, function (b, a) {
                    b !== p[a] && (e[a] = b, f = !0)
                });
                if (f) {
                    p && (b = h(p, e));
                    if (b)
                        if (null === b.width || "auto" === b.width) delete this.textWidth;
                        else if ("text" === c.nodeName.toLowerCase() && b.width) var C = this.textWidth = a(b.width);
                    this.styles = b;
                    C && !w && this.renderer.forExport && delete b.width;
                    if (c.namespaceURI === this.SVG_NS) {
                        var k = function (b, a) {
                            return "-" + a.toLowerCase()
                        };
                        m(b, function (b, a) {
                            -1 === l.indexOf(a) && (n += a.replace(/([A-Z])/g, k) + ":" + b + ";")
                        });
                        n && A(c, "style", n)
                    } else L(c, b);
                    this.added && ("text" === this.element.nodeName && this.renderer.buildText(this), b && b.textOutline && this.applyTextOutline(b.textOutline))
                }
                return this
            },
            getStyle: function (b) {
                return X.getComputedStyle(this.element || this, "").getPropertyValue(b)
            },
            strokeWidth: function () {
                if (!this.renderer.styledMode) return this["stroke-width"] ||
                    0;
                var b = this.getStyle("stroke-width"),
                    e = 0;
                if (b.indexOf("px") === b.length - 2) e = a(b);
                else if ("" !== b) {
                    var c = Q.createElementNS(R, "rect");
                    A(c, {
                        width: b,
                        "stroke-width": 0
                    });
                    this.element.parentNode.appendChild(c);
                    e = c.getBBox().width;
                    c.parentNode.removeChild(c)
                }
                return e
            },
            on: function (b, a) {
                var p = this,
                    e = p.element;
                I && "click" === b ? (e.ontouchstart = function (b) {
                    p.touchEventFired = Date.now();
                    b.preventDefault();
                    a.call(e, b)
                }, e.onclick = function (b) {
                    (-1 === X.navigator.userAgent.indexOf("Android") || 1100 < Date.now() - (p.touchEventFired ||
                        0)) && a.call(e, b)
                }) : e["on" + b] = a;
                return this
            },
            setRadialReference: function (b) {
                var a = this.renderer.gradients[this.element.gradient];
                this.element.radialReference = b;
                a && a.radAttr && a.animate(this.renderer.getRadialAttr(b, a.radAttr));
                return this
            },
            translate: function (b, a) {
                return this.attr({
                    translateX: b,
                    translateY: a
                })
            },
            invert: function (b) {
                this.inverted = b;
                this.updateTransform();
                return this
            },
            updateTransform: function () {
                var b = this.translateX || 0,
                    a = this.translateY || 0,
                    c = this.scaleX,
                    n = this.scaleY,
                    w = this.inverted,
                    f = this.rotation,
                    l = this.matrix,
                    C = this.element;
                w && (b += this.width, a += this.height);
                b = ["translate(" + b + "," + a + ")"];
                y(l) && b.push("matrix(" + l.join(",") + ")");
                w ? b.push("rotate(90) scale(-1,1)") : f && b.push("rotate(" + f + " " + e(this.rotationOriginX, C.getAttribute("x"), 0) + " " + e(this.rotationOriginY, C.getAttribute("y") || 0) + ")");
                (y(c) || y(n)) && b.push("scale(" + e(c, 1) + " " + e(n, 1) + ")");
                b.length && C.setAttribute("transform", b.join(" "))
            },
            toFront: function () {
                var b = this.element;
                b.parentNode.appendChild(b);
                return this
            },
            align: function (b, a, n) {
                var p,
                    w = {};
                var f = this.renderer;
                var l = f.alignedObjects;
                var C, k;
                if (b) {
                    if (this.alignOptions = b, this.alignByTranslate = a, !n || c(n)) this.alignTo = p = n || "renderer", D(l, this), l.push(this), n = null
                } else b = this.alignOptions, a = this.alignByTranslate, p = this.alignTo;
                n = e(n, f[p], f);
                p = b.align;
                f = b.verticalAlign;
                l = (n.x || 0) + (b.x || 0);
                var T = (n.y || 0) + (b.y || 0);
                "right" === p ? C = 1 : "center" === p && (C = 2);
                C && (l += (n.width - (b.width || 0)) / C);
                w[a ? "translateX" : "x"] = Math.round(l);
                "bottom" === f ? k = 1 : "middle" === f && (k = 2);
                k && (T += (n.height - (b.height || 0)) /
                    k);
                w[a ? "translateY" : "y"] = Math.round(T);
                this[this.placed ? "animate" : "attr"](w);
                this.placed = !0;
                this.alignAttr = w;
                return this
            },
            getBBox: function (b, a) {
                var p, c = this.renderer,
                    n = this.element,
                    w = this.styles,
                    f = this.textStr,
                    l, C = c.cache,
                    k = c.cacheKeys,
                    T = n.namespaceURI === this.SVG_NS;
                a = e(a, this.rotation, 0);
                var x = c.styledMode ? n && U.prototype.getStyle.call(n, "font-size") : w && w.fontSize;
                if (y(f)) {
                    var m = f.toString(); - 1 === m.indexOf("<") && (m = m.replace(/[0-9]/g, "0"));
                    m += ["", a, x, this.textWidth, w && w.textOverflow].join()
                }
                m && !b &&
                    (p = C[m]);
                if (!p) {
                    if (T || c.forExport) {
                        try {
                            (l = this.fakeTS && function (b) {
                                [].forEach.call(n.querySelectorAll(".highcharts-text-outline"), function (a) {
                                    a.style.display = b
                                })
                            }) && l("none"), p = n.getBBox ? h({}, n.getBBox()) : {
                                width: n.offsetWidth,
                                height: n.offsetHeight
                            }, l && l("")
                        } catch (ea) {
                            ""
                        }
                        if (!p || 0 > p.width) p = {
                            width: 0,
                            height: 0
                        }
                    } else p = this.htmlGetBBox();
                    c.isSVG && (b = p.width, c = p.height, T && (p.height = c = {
                        "11px,17": 14,
                        "13px,20": 16
                    } [w && w.fontSize + "," + Math.round(c)] || c), a && (w = a * H, p.width = Math.abs(c * Math.sin(w)) + Math.abs(b * Math.cos(w)),
                        p.height = Math.abs(c * Math.cos(w)) + Math.abs(b * Math.sin(w))));
                    if (m && 0 < p.height) {
                        for (; 250 < k.length;) delete C[k.shift()];
                        C[m] || k.push(m);
                        C[m] = p
                    }
                }
                return p
            },
            show: function (b) {
                return this.attr({
                    visibility: b ? "inherit" : "visible"
                })
            },
            hide: function (b) {
                b ? this.attr({
                    y: -9999
                }) : this.attr({
                    visibility: "hidden"
                });
                return this
            },
            fadeOut: function (b) {
                var a = this;
                a.animate({
                    opacity: 0
                }, {
                    duration: b || 150,
                    complete: function () {
                        a.attr({
                            y: -9999
                        })
                    }
                })
            },
            add: function (b) {
                var a = this.renderer,
                    p = this.element;
                b && (this.parentGroup = b);
                this.parentInverted =
                    b && b.inverted;
                "undefined" !== typeof this.textStr && a.buildText(this);
                this.added = !0;
                if (!b || b.handleZ || this.zIndex) var e = this.zIndexSetter();
                e || (b ? b.element : a.box).appendChild(p);
                if (this.onAdd) this.onAdd();
                return this
            },
            safeRemoveChild: function (b) {
                var a = b.parentNode;
                a && a.removeChild(b)
            },
            destroy: function () {
                var b = this,
                    a = b.element || {},
                    e = b.renderer,
                    c = e.isSVG && "SPAN" === a.nodeName && b.parentGroup,
                    n = a.ownerSVGElement,
                    w = b.clipPath;
                a.onclick = a.onmouseout = a.onmouseover = a.onmousemove = a.point = null;
                z(b);
                w && n && ([].forEach.call(n.querySelectorAll("[clip-path],[CLIP-PATH]"),
                    function (b) {
                        -1 < b.getAttribute("clip-path").indexOf(w.element.id) && b.removeAttribute("clip-path")
                    }), b.clipPath = w.destroy());
                if (b.stops) {
                    for (n = 0; n < b.stops.length; n++) b.stops[n] = b.stops[n].destroy();
                    b.stops = null
                }
                b.safeRemoveChild(a);
                for (e.styledMode || b.destroyShadows(); c && c.div && 0 === c.div.childNodes.length;) a = c.parentGroup, b.safeRemoveChild(c.div), delete c.div, c = a;
                b.alignTo && D(e.alignedObjects, b);
                m(b, function (a, p) {
                    b[p] && b[p].parentGroup === b && b[p].destroy && b[p].destroy();
                    delete b[p]
                })
            },
            shadow: function (b,
                a, c) {
                var p = [],
                    n, w = this.element;
                if (!b) this.destroyShadows();
                else if (!this.shadows) {
                    var f = e(b.width, 3);
                    var l = (b.opacity || .15) / f;
                    var C = this.parentInverted ? "(-1,-1)" : "(" + e(b.offsetX, 1) + ", " + e(b.offsetY, 1) + ")";
                    for (n = 1; n <= f; n++) {
                        var k = w.cloneNode(0);
                        var m = 2 * f + 1 - 2 * n;
                        A(k, {
                            stroke: b.color || "#000000",
                            "stroke-opacity": l * n,
                            "stroke-width": m,
                            transform: "translate" + C,
                            fill: "none"
                        });
                        k.setAttribute("class", (k.getAttribute("class") || "") + " highcharts-shadow");
                        c && (A(k, "height", Math.max(A(k, "height") - m, 0)), k.cutHeight = m);
                        a ? a.element.appendChild(k) : w.parentNode && w.parentNode.insertBefore(k, w);
                        p.push(k)
                    }
                    this.shadows = p
                }
                return this
            },
            destroyShadows: function () {
                (this.shadows || []).forEach(function (b) {
                    this.safeRemoveChild(b)
                }, this);
                this.shadows = void 0
            },
            xGetter: function (b) {
                "circle" === this.element.nodeName && ("x" === b ? b = "cx" : "y" === b && (b = "cy"));
                return this._defaultGetter(b)
            },
            _defaultGetter: function (b) {
                b = e(this[b + "Value"], this[b], this.element ? this.element.getAttribute(b) : null, 0);
                /^[\-0-9\.]+$/.test(b) && (b = parseFloat(b));
                return b
            },
            dSetter: function (b, a, e) {
                b && b.join && (b = b.join(" "));
                /(NaN| {2}|^$)/.test(b) && (b = "M 0 0");
                this[a] !== b && (e.setAttribute(a, b), this[a] = b)
            },
            dashstyleSetter: function (b) {
                var e, p = this["stroke-width"];
                "inherit" === p && (p = 1);
                if (b = b && b.toLowerCase()) {
                    b = b.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",");
                    for (e = b.length; e--;) b[e] = a(b[e]) *
                        p;
                    b = b.join(",").replace(/NaN/g, "none");
                    this.element.setAttribute("stroke-dasharray", b)
                }
            },
            alignSetter: function (b) {
                var a = {
                    left: "start",
                    center: "middle",
                    right: "end"
                };
                a[b] && (this.alignValue = b, this.element.setAttribute("text-anchor", a[b]))
            },
            opacitySetter: function (b, a, e) {
                this[a] = b;
                e.setAttribute(a, b)
            },
            titleSetter: function (b) {
                var a = this.element.getElementsByTagName("title")[0];
                a || (a = Q.createElementNS(this.SVG_NS, "title"), this.element.appendChild(a));
                a.firstChild && a.removeChild(a.firstChild);
                a.appendChild(Q.createTextNode(String(e(b,
                    "")).replace(/<[^>]*>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">")))
            },
            textSetter: function (b) {
                b !== this.textStr && (delete this.bBox, delete this.textPxLength, this.textStr = b, this.added && this.renderer.buildText(this))
            },
            setTextPath: function (b, a) {
                var e = this.element,
                    c = {
                        textAnchor: "text-anchor"
                    },
                    p = !1,
                    n = this.textPathWrapper,
                    w = !n;
                a = k(!0, {
                    enabled: !0,
                    attributes: {
                        dy: -5,
                        startOffset: "50%",
                        textAnchor: "middle"
                    }
                }, a);
                var f = a.attributes;
                if (b && a && a.enabled) {
                    n && null === n.element.parentNode ? (w = !0, n = n.destroy()) : n && this.removeTextOutline.call(n.parentGroup,
                        [].slice.call(e.getElementsByTagName("tspan")));
                    this.options && this.options.padding && (f.dx = -this.options.padding);
                    n || (this.textPathWrapper = n = this.renderer.createElement("textPath"), p = !0);
                    var l = n.element;
                    (a = b.element.getAttribute("id")) || b.element.setAttribute("id", a = x());
                    if (w)
                        for (b = e.getElementsByTagName("tspan"); b.length;) b[0].setAttribute("y", 0), P(f.dx) && b[0].setAttribute("x", -f.dx), l.appendChild(b[0]);
                    p && n.add({
                        element: this.text ? this.text.element : e
                    });
                    l.setAttributeNS("http://www.w3.org/1999/xlink",
                        "href", this.renderer.url + "#" + a);
                    y(f.dy) && (l.parentNode.setAttribute("dy", f.dy), delete f.dy);
                    y(f.dx) && (l.parentNode.setAttribute("dx", f.dx), delete f.dx);
                    m(f, function (b, a) {
                        l.setAttribute(c[a] || a, b)
                    });
                    e.removeAttribute("transform");
                    this.removeTextOutline.call(n, [].slice.call(e.getElementsByTagName("tspan")));
                    this.text && !this.renderer.styledMode && this.attr({
                        fill: "none",
                        "stroke-width": 0
                    });
                    this.applyTextOutline = this.updateTransform = C
                } else n && (delete this.updateTransform, delete this.applyTextOutline, this.destroyTextPath(e,
                    b), this.updateTransform(), this.options.rotation && this.applyTextOutline(this.options.style.textOutline));
                return this
            },
            destroyTextPath: function (b, a) {
                var e = b.getElementsByTagName("text")[0];
                if (e) {
                    if (e.removeAttribute("dx"), e.removeAttribute("dy"), a.element.setAttribute("id", ""), e.getElementsByTagName("textPath").length) {
                        for (b = this.textPathWrapper.element.childNodes; b.length;) e.appendChild(b[0]);
                        e.removeChild(this.textPathWrapper.element)
                    }
                } else if (b.getAttribute("dx") || b.getAttribute("dy")) b.removeAttribute("dx"),
                    b.removeAttribute("dy");
                this.textPathWrapper = this.textPathWrapper.destroy()
            },
            fillSetter: function (b, a, e) {
                "string" === typeof b ? e.setAttribute(a, b) : b && this.complexColor(b, a, e)
            },
            visibilitySetter: function (b, a, e) {
                "inherit" === b ? e.removeAttribute(a) : this[a] !== b && e.setAttribute(a, b);
                this[a] = b
            },
            zIndexSetter: function (b, e) {
                var c = this.renderer,
                    p = this.parentGroup,
                    n = (p || c).element || c.box,
                    w = this.element,
                    f = !1;
                c = n === c.box;
                var l = this.added;
                var C;
                y(b) ? (w.setAttribute("data-z-index", b), b = +b, this[e] === b && (l = !1)) : y(this[e]) &&
                    w.removeAttribute("data-z-index");
                this[e] = b;
                if (l) {
                    (b = this.zIndex) && p && (p.handleZ = !0);
                    e = n.childNodes;
                    for (C = e.length - 1; 0 <= C && !f; C--) {
                        p = e[C];
                        l = p.getAttribute("data-z-index");
                        var k = !y(l);
                        if (p !== w)
                            if (0 > b && k && !c && !C) n.insertBefore(w, e[C]), f = !0;
                            else if (a(l) <= b || k && (!y(b) || 0 <= b)) n.insertBefore(w, e[C + 1] || null), f = !0
                    }
                    f || (n.insertBefore(w, e[c ? 3 : 0] || null), f = !0)
                }
                return f
            },
            _defaultSetter: function (b, a, e) {
                e.setAttribute(a, b)
            }
        });
        U.prototype.yGetter = U.prototype.xGetter;
        U.prototype.translateXSetter = U.prototype.translateYSetter =
            U.prototype.rotationSetter = U.prototype.verticalAlignSetter = U.prototype.rotationOriginXSetter = U.prototype.rotationOriginYSetter = U.prototype.scaleXSetter = U.prototype.scaleYSetter = U.prototype.matrixSetter = function (b, a) {
                this[a] = b;
                this.doTransform = !0
            };
        U.prototype["stroke-widthSetter"] = U.prototype.strokeSetter = function (b, a, e) {
            this[a] = b;
            this.stroke && this["stroke-width"] ? (U.prototype.fillSetter.call(this, this.stroke, "stroke", e), e.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0) : "stroke-width" ===
                a && 0 === b && this.hasStroke ? (e.removeAttribute("stroke"), this.hasStroke = !1) : this.renderer.styledMode && this["stroke-width"] && (e.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0)
        };
        g = d.SVGRenderer = function () {
            this.init.apply(this, arguments)
        };
        h(g.prototype, {
            Element: U,
            SVG_NS: R,
            init: function (a, e, c, n, w, f, l) {
                var p = this.createElement("svg").attr({
                    version: "1.1",
                    "class": "highcharts-root"
                });
                l || p.css(this.getStyle(n));
                n = p.element;
                a.appendChild(n);
                A(a, "dir", "ltr"); - 1 === a.innerHTML.indexOf("xmlns") &&
                    A(n, "xmlns", this.SVG_NS);
                this.isSVG = !0;
                this.box = n;
                this.boxWrapper = p;
                this.alignedObjects = [];
                this.url = (K || b) && Q.getElementsByTagName("base").length ? X.location.href.split("#")[0].replace(/<[^>]*>/g, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : "";
                this.createElement("desc").add().element.appendChild(Q.createTextNode("Created with Highcharts 8.0.3"));
                this.defs = this.createElement("defs").add();
                this.allowHTML = f;
                this.forExport = w;
                this.styledMode = l;
                this.gradients = {};
                this.cache = {};
                this.cacheKeys = [];
                this.imgCount =
                    0;
                this.setSize(e, c, !1);
                var C;
                K && a.getBoundingClientRect && (e = function () {
                    L(a, {
                        left: 0,
                        top: 0
                    });
                    C = a.getBoundingClientRect();
                    L(a, {
                        left: Math.ceil(C.left) - C.left + "px",
                        top: Math.ceil(C.top) - C.top + "px"
                    })
                }, e(), this.unSubPixelFix = J(X, "resize", e))
            },
            definition: function (b) {
                function a(b, c) {
                    var n;
                    t(b).forEach(function (b) {
                        var p = e.createElement(b.tagName),
                            w = {};
                        m(b, function (b, a) {
                            "tagName" !== a && "children" !== a && "textContent" !== a && (w[a] = b)
                        });
                        p.attr(w);
                        p.add(c || e.defs);
                        b.textContent && p.element.appendChild(Q.createTextNode(b.textContent));
                        a(b.children || [], p);
                        n = p
                    });
                    return n
                }
                var e = this;
                return a(b)
            },
            getStyle: function (b) {
                return this.style = h({
                    fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
                    fontSize: "12px"
                }, b)
            },
            setStyle: function (b) {
                this.boxWrapper.css(this.getStyle(b))
            },
            isHidden: function () {
                return !this.boxWrapper.getBBox().width
            },
            destroy: function () {
                var b = this.defs;
                this.box = null;
                this.boxWrapper = this.boxWrapper.destroy();
                u(this.gradients || {});
                this.gradients = null;
                b && (this.defs = b.destroy());
                this.unSubPixelFix &&
                    this.unSubPixelFix();
                return this.alignedObjects = null
            },
            createElement: function (b) {
                var a = new this.Element;
                a.init(this, b);
                return a
            },
            draw: C,
            getRadialAttr: function (b, a) {
                return {
                    cx: b[0] - b[2] / 2 + a.cx * b[2],
                    cy: b[1] - b[2] / 2 + a.cy * b[2],
                    r: a.r * b[2]
                }
            },
            truncate: function (b, a, e, c, n, w, f) {
                var p = this,
                    l = b.rotation,
                    C, k = c ? 1 : 0,
                    G = (e || c).length,
                    m = G,
                    x = [],
                    t = function (b) {
                        a.firstChild && a.removeChild(a.firstChild);
                        b && a.appendChild(Q.createTextNode(b))
                    },
                    z = function (w, l) {
                        l = l || w;
                        if ("undefined" === typeof x[l])
                            if (a.getSubStringLength) try {
                                x[l] =
                                    n + a.getSubStringLength(0, c ? l + 1 : l)
                            } catch (la) {
                                ""
                            } else p.getSpanWidth && (t(f(e || c, w)), x[l] = n + p.getSpanWidth(b, a));
                        return x[l]
                    },
                    O;
                b.rotation = 0;
                var T = z(a.textContent.length);
                if (O = n + T > w) {
                    for (; k <= G;) m = Math.ceil((k + G) / 2), c && (C = f(c, m)), T = z(m, C && C.length - 1), k === G ? k = G + 1 : T > w ? G = m - 1 : k = m;
                    0 === G ? t("") : e && G === e.length - 1 || t(C || f(e || c, m))
                }
                c && c.splice(0, m);
                b.actualWidth = T;
                b.rotation = l;
                return O
            },
            escapes: {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                "'": "&#39;",
                '"': "&quot;"
            },
            buildText: function (b) {
                var c = b.element,
                    n = this,
                    p = n.forExport,
                    f = e(b.textStr, "").toString(),
                    l = -1 !== f.indexOf("<"),
                    C = c.childNodes,
                    k, x = A(c, "x"),
                    t = b.styles,
                    z = b.textWidth,
                    O = t && t.lineHeight,
                    q = t && t.textOutline,
                    B = t && "ellipsis" === t.textOverflow,
                    d = t && "nowrap" === t.whiteSpace,
                    N = t && t.fontSize,
                    X, h = C.length;
                t = z && !b.added && this.box;
                var H = function (b) {
                        var e;
                        n.styledMode || (e = /(px|em)$/.test(b && b.style.fontSize) ? b.style.fontSize : N || n.style.fontSize || 12);
                        return O ? a(O) : n.fontMetrics(e, b.getAttribute("style") ? b : c).h
                    },
                    u = function (b, a) {
                        m(n.escapes, function (e, c) {
                            a && -1 !== a.indexOf(e) ||
                                (b = b.toString().replace(new RegExp(e, "g"), c))
                        });
                        return b
                    },
                    U = function (b, a) {
                        var e = b.indexOf("<");
                        b = b.substring(e, b.indexOf(">") - e);
                        e = b.indexOf(a + "=");
                        if (-1 !== e && (e = e + a.length + 1, a = b.charAt(e), '"' === a || "'" === a)) return b = b.substring(e + 1), b.substring(0, b.indexOf(a))
                    },
                    P = /<br.*?>/g;
                var g = [f, B, d, O, q, N, z].join();
                if (g !== b.textCache) {
                    for (b.textCache = g; h--;) c.removeChild(C[h]);
                    l || q || B || z || -1 !== f.indexOf(" ") && (!d || P.test(f)) ? (t && t.appendChild(c), l ? (f = n.styledMode ? f.replace(/<(b|strong)>/g, '<span class="highcharts-strong">').replace(/<(i|em)>/g,
                            '<span class="highcharts-emphasized">') : f.replace(/<(b|strong)>/g, '<span style="font-weight:bold">').replace(/<(i|em)>/g, '<span style="font-style:italic">'), f = f.replace(/<a/g, "<span").replace(/<\/(b|strong|i|em|a)>/g, "</span>").split(P)) : f = [f], f = f.filter(function (b) {
                            return "" !== b
                        }), f.forEach(function (a, e) {
                            var f = 0,
                                l = 0;
                            a = a.replace(/^\s+|\s+$/g, "").replace(/<span/g, "|||<span").replace(/<\/span>/g, "</span>|||");
                            var C = a.split("|||");
                            C.forEach(function (a) {
                                if ("" !== a || 1 === C.length) {
                                    var G = {},
                                        m = Q.createElementNS(n.SVG_NS,
                                            "tspan"),
                                        t, O;
                                    (t = U(a, "class")) && A(m, "class", t);
                                    if (t = U(a, "style")) t = t.replace(/(;| |^)color([ :])/, "$1fill$2"), A(m, "style", t);
                                    (O = U(a, "href")) && !p && (A(m, "onclick", 'location.href="' + O + '"'), A(m, "class", "highcharts-anchor"), n.styledMode || L(m, {
                                        cursor: "pointer"
                                    }));
                                    a = u(a.replace(/<[a-zA-Z\/](.|\n)*?>/g, "") || " ");
                                    if (" " !== a) {
                                        m.appendChild(Q.createTextNode(a));
                                        f ? G.dx = 0 : e && null !== x && (G.x = x);
                                        A(m, G);
                                        c.appendChild(m);
                                        !f && X && (!w && p && L(m, {
                                            display: "block"
                                        }), A(m, "dy", H(m)));
                                        if (z) {
                                            var q = a.replace(/([^\^])-/g, "$1- ").split(" ");
                                            G = !d && (1 < C.length || e || 1 < q.length);
                                            O = 0;
                                            var T = H(m);
                                            if (B) k = n.truncate(b, m, a, void 0, 0, Math.max(0, z - parseInt(N || 12, 10)), function (b, a) {
                                                return b.substring(0, a) + "\u2026"
                                            });
                                            else if (G)
                                                for (; q.length;) q.length && !d && 0 < O && (m = Q.createElementNS(R, "tspan"), A(m, {
                                                    dy: T,
                                                    x: x
                                                }), t && A(m, "style", t), m.appendChild(Q.createTextNode(q.join(" ").replace(/- /g, "-"))), c.appendChild(m)), n.truncate(b, m, null, q, 0 === O ? l : 0, z, function (b, a) {
                                                    return q.slice(0, a).join(" ").replace(/- /g, "-")
                                                }), l = b.actualWidth, O++
                                        }
                                        f++
                                    }
                                }
                            });
                            X = X || c.childNodes.length
                        }),
                        B && k && b.attr("title", u(b.textStr, ["&lt;", "&gt;"])), t && t.removeChild(c), q && b.applyTextOutline && b.applyTextOutline(q)) : c.appendChild(Q.createTextNode(u(f)))
                }
            },
            getContrast: function (b) {
                b = v(b).rgba;
                b[0] *= 1;
                b[1] *= 1.2;
                b[2] *= .5;
                return 459 < b[0] + b[1] + b[2] ? "#000000" : "#FFFFFF"
            },
            button: function (b, a, e, c, w, f, l, C, m, t) {
                var p = this.label(b, a, e, m, null, null, t, null, "button"),
                    G = 0,
                    x = this.styledMode;
                p.attr(k({
                    padding: 8,
                    r: 2
                }, w));
                if (!x) {
                    w = k({
                        fill: "#f7f7f7",
                        stroke: "#cccccc",
                        "stroke-width": 1,
                        style: {
                            color: "#333333",
                            cursor: "pointer",
                            fontWeight: "normal"
                        }
                    }, w);
                    var z = w.style;
                    delete w.style;
                    f = k(w, {
                        fill: "#e6e6e6"
                    }, f);
                    var O = f.style;
                    delete f.style;
                    l = k(w, {
                        fill: "#e6ebf5",
                        style: {
                            color: "#000000",
                            fontWeight: "bold"
                        }
                    }, l);
                    var q = l.style;
                    delete l.style;
                    C = k(w, {
                        style: {
                            color: "#cccccc"
                        }
                    }, C);
                    var R = C.style;
                    delete C.style
                }
                J(p.element, n ? "mouseover" : "mouseenter", function () {
                    3 !== G && p.setState(1)
                });
                J(p.element, n ? "mouseout" : "mouseleave", function () {
                    3 !== G && p.setState(G)
                });
                p.setState = function (b) {
                    1 !== b && (p.state = G = b);
                    p.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed", "disabled"][b || 0]);
                    x || p.attr([w, f, l, C][b || 0]).css([z, O, q, R][b || 0])
                };
                x || p.attr(w).css(h({
                    cursor: "default"
                }, z));
                return p.on("click", function (b) {
                    3 !== G && c.call(p, b)
                })
            },
            crispLine: function (b, a) {
                b[1] === b[4] && (b[1] = b[4] = Math.round(b[1]) - a % 2 / 2);
                b[2] === b[5] && (b[2] = b[5] = Math.round(b[2]) + a % 2 / 2);
                return b
            },
            path: function (b) {
                var a = this.styledMode ? {} : {
                    fill: "none"
                };
                q(b) ? a.d = b : f(b) && h(a, b);
                return this.createElement("path").attr(a)
            },
            circle: function (b, a, e) {
                b = f(b) ? b : "undefined" === typeof b ? {} : {
                    x: b,
                    y: a,
                    r: e
                };
                a = this.createElement("circle");
                a.xSetter = a.ySetter = function (b, a, e) {
                    e.setAttribute("c" + a, b)
                };
                return a.attr(b)
            },
            arc: function (b, a, e, c, n, w) {
                f(b) ? (c = b, a = c.y, e = c.r, b = c.x) : c = {
                    innerR: c,
                    start: n,
                    end: w
                };
                b = this.symbol("arc", b, a, e, e, c);
                b.r = e;
                return b
            },
            rect: function (b, a, e, c, n, w) {
                n = f(b) ? b.r : n;
                var p = this.createElement("rect");
                b = f(b) ? b : "undefined" === typeof b ? {} : {
                    x: b,
                    y: a,
                    width: Math.max(e, 0),
                    height: Math.max(c, 0)
                };
                this.styledMode || ("undefined" !== typeof w && (b.strokeWidth = w, b = p.crisp(b)), b.fill = "none");
                n &&
                    (b.r = n);
                p.rSetter = function (b, a, e) {
                    p.r = b;
                    A(e, {
                        rx: b,
                        ry: b
                    })
                };
                p.rGetter = function () {
                    return p.r
                };
                return p.attr(b)
            },
            setSize: function (b, a, c) {
                var n = this.alignedObjects,
                    w = n.length;
                this.width = b;
                this.height = a;
                for (this.boxWrapper.animate({
                        width: b,
                        height: a
                    }, {
                        step: function () {
                            this.attr({
                                viewBox: "0 0 " + this.attr("width") + " " + this.attr("height")
                            })
                        },
                        duration: e(c, !0) ? void 0 : 0
                    }); w--;) n[w].align()
            },
            g: function (b) {
                var a = this.createElement("g");
                return b ? a.attr({
                    "class": "highcharts-" + b
                }) : a
            },
            image: function (b, a, e, c, n, w) {
                var f = {
                        preserveAspectRatio: "none"
                    },
                    p = function (b, a) {
                        b.setAttributeNS ? b.setAttributeNS("http://www.w3.org/1999/xlink", "href", a) : b.setAttribute("hc-svg-href", a)
                    },
                    l = function (a) {
                        p(C.element, b);
                        w.call(C, a)
                    };
                1 < arguments.length && h(f, {
                    x: a,
                    y: e,
                    width: c,
                    height: n
                });
                var C = this.createElement("image").attr(f);
                w ? (p(C.element, "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="), f = new X.Image, J(f, "load", l), f.src = b, f.complete && l({})) : p(C.element, b);
                return C
            },
            symbol: function (b, a, c, n, w, f) {
                var p = this,
                    l = /^url\((.*?)\)$/,
                    C = l.test(b),
                    k = !C && (this.symbols[b] ? b : "circle"),
                    m = k && this.symbols[k],
                    t = y(a) && m && m.call(this.symbols, Math.round(a), Math.round(c), n, w, f);
                if (m) {
                    var x = this.path(t);
                    p.styledMode || x.attr("fill", "none");
                    h(x, {
                        symbolName: k,
                        x: a,
                        y: c,
                        width: n,
                        height: w
                    });
                    f && h(x, f)
                } else if (C) {
                    var G = b.match(l)[1];
                    x = this.image(G);
                    x.imgwidth = e(O[G] && O[G].width, f && f.width);
                    x.imgheight = e(O[G] && O[G].height, f && f.height);
                    var z = function () {
                        x.attr({
                            width: x.width,
                            height: x.height
                        })
                    };
                    ["width", "height"].forEach(function (b) {
                        x[b +
                            "Setter"] = function (b, a) {
                            var e = {},
                                c = this["img" + a],
                                n = "width" === a ? "translateX" : "translateY";
                            this[a] = b;
                            y(c) && (f && "within" === f.backgroundSize && this.width && this.height && (c = Math.round(c * Math.min(this.width / this.imgwidth, this.height / this.imgheight))), this.element && this.element.setAttribute(a, c), this.alignByTranslate || (e[n] = ((this[a] || 0) - c) / 2, this.attr(e)))
                        }
                    });
                    y(a) && x.attr({
                        x: a,
                        y: c
                    });
                    x.isImg = !0;
                    y(x.imgwidth) && y(x.imgheight) ? z() : (x.attr({
                        width: 0,
                        height: 0
                    }), F("img", {
                        onload: function () {
                            var b = B[p.chartIndex];
                            0 ===
                                this.width && (L(this, {
                                    position: "absolute",
                                    top: "-999em"
                                }), Q.body.appendChild(this));
                            O[G] = {
                                width: this.width,
                                height: this.height
                            };
                            x.imgwidth = this.width;
                            x.imgheight = this.height;
                            x.element && z();
                            this.parentNode && this.parentNode.removeChild(this);
                            p.imgCount--;
                            if (!p.imgCount && b && !b.hasLoaded) b.onload()
                        },
                        src: G
                    }), this.imgCount++)
                }
                return x
            },
            symbols: {
                circle: function (b, a, e, c) {
                    return this.arc(b + e / 2, a + c / 2, e / 2, c / 2, {
                        start: .5 * Math.PI,
                        end: 2.5 * Math.PI,
                        open: !1
                    })
                },
                square: function (b, a, e, c) {
                    return ["M", b, a, "L", b + e, a, b + e, a + c,
                        b, a + c, "Z"
                    ]
                },
                triangle: function (b, a, e, c) {
                    return ["M", b + e / 2, a, "L", b + e, a + c, b, a + c, "Z"]
                },
                "triangle-down": function (b, a, e, c) {
                    return ["M", b, a, "L", b + e, a, b + e / 2, a + c, "Z"]
                },
                diamond: function (b, a, e, c) {
                    return ["M", b + e / 2, a, "L", b + e, a + c / 2, b + e / 2, a + c, b, a + c / 2, "Z"]
                },
                arc: function (b, a, c, n, w) {
                    var f = w.start,
                        p = w.r || c,
                        l = w.r || n || c,
                        C = w.end - .001;
                    c = w.innerR;
                    n = e(w.open, .001 > Math.abs(w.end - w.start - 2 * Math.PI));
                    var k = Math.cos(f),
                        m = Math.sin(f),
                        x = Math.cos(C);
                    C = Math.sin(C);
                    f = e(w.longArc, .001 > w.end - f - Math.PI ? 0 : 1);
                    p = ["M", b + p * k, a + l * m, "A", p, l,
                        0, f, e(w.clockwise, 1), b + p * x, a + l * C
                    ];
                    y(c) && p.push(n ? "M" : "L", b + c * x, a + c * C, "A", c, c, 0, f, y(w.clockwise) ? 1 - w.clockwise : 0, b + c * k, a + c * m);
                    p.push(n ? "" : "Z");
                    return p
                },
                callout: function (b, a, e, c, n) {
                    var w = Math.min(n && n.r || 0, e, c),
                        f = w + 6,
                        l = n && n.anchorX;
                    n = n && n.anchorY;
                    var C = ["M", b + w, a, "L", b + e - w, a, "C", b + e, a, b + e, a, b + e, a + w, "L", b + e, a + c - w, "C", b + e, a + c, b + e, a + c, b + e - w, a + c, "L", b + w, a + c, "C", b, a + c, b, a + c, b, a + c - w, "L", b, a + w, "C", b, a, b, a, b + w, a];
                    l && l > e ? n > a + f && n < a + c - f ? C.splice(13, 3, "L", b + e, n - 6, b + e + 6, n, b + e, n + 6, b + e, a + c - w) : C.splice(13, 3, "L",
                        b + e, c / 2, l, n, b + e, c / 2, b + e, a + c - w) : l && 0 > l ? n > a + f && n < a + c - f ? C.splice(33, 3, "L", b, n + 6, b - 6, n, b, n - 6, b, a + w) : C.splice(33, 3, "L", b, c / 2, l, n, b, c / 2, b, a + w) : n && n > c && l > b + f && l < b + e - f ? C.splice(23, 3, "L", l + 6, a + c, l, a + c + 6, l - 6, a + c, b + w, a + c) : n && 0 > n && l > b + f && l < b + e - f && C.splice(3, 3, "L", l - 6, a, l, a - 6, l + 6, a, e - w, a);
                    return C
                }
            },
            clipRect: function (b, a, e, c) {
                var n = x() + "-",
                    w = this.createElement("clipPath").attr({
                        id: n
                    }).add(this.defs);
                b = this.rect(b, a, e, c, 0).add(w);
                b.id = n;
                b.clipPath = w;
                b.count = 0;
                return b
            },
            text: function (b, a, e, c) {
                var n = {};
                if (c && (this.allowHTML ||
                        !this.forExport)) return this.html(b, a, e);
                n.x = Math.round(a || 0);
                e && (n.y = Math.round(e));
                y(b) && (n.text = b);
                b = this.createElement("text").attr(n);
                c || (b.xSetter = function (b, a, e) {
                    var c = e.getElementsByTagName("tspan"),
                        n = e.getAttribute(a),
                        w;
                    for (w = 0; w < c.length; w++) {
                        var f = c[w];
                        f.getAttribute(a) === n && f.setAttribute(a, b)
                    }
                    e.setAttribute(a, b)
                });
                return b
            },
            fontMetrics: function (b, e) {
                b = !this.styledMode && /px/.test(b) || !X.getComputedStyle ? b || e && e.style && e.style.fontSize || this.style && this.style.fontSize : e && U.prototype.getStyle.call(e,
                    "font-size");
                b = /px/.test(b) ? a(b) : 12;
                e = 24 > b ? b + 3 : Math.round(1.2 * b);
                return {
                    h: e,
                    b: Math.round(.8 * e),
                    f: b
                }
            },
            rotCorr: function (b, a, e) {
                var c = b;
                a && e && (c = Math.max(c * Math.cos(a * H), 4));
                return {
                    x: -b / 3 * Math.sin(a * H),
                    y: c
                }
            },
            label: function (b, a, e, c, n, w, f, C, m) {
                var p = this,
                    x = p.styledMode,
                    t = p.g("button" !== m && "label"),
                    G = t.text = p.text("", 0, 0, f).attr({
                        zIndex: 1
                    }),
                    z, O, q = 0,
                    R = 3,
                    B = 0,
                    d, N, X, V, H, u = {},
                    T, g, K = /^url\((.*?)\)$/.test(c),
                    I = x || K,
                    Q = function () {
                        return x ? z.strokeWidth() % 2 / 2 : (T ? parseInt(T, 10) : 0) % 2 / 2
                    };
                m && t.addClass("highcharts-" +
                    m);
                var ba = function () {
                    var b = G.element.style,
                        a = {};
                    O = ("undefined" === typeof d || "undefined" === typeof N || H) && y(G.textStr) && G.getBBox();
                    t.width = (d || O.width || 0) + 2 * R + B;
                    t.height = (N || O.height || 0) + 2 * R;
                    g = R + Math.min(p.fontMetrics(b && b.fontSize, G).b, O ? O.height : Infinity);
                    I && (z || (t.box = z = p.symbols[c] || K ? p.symbol(c) : p.rect(), z.addClass(("button" === m ? "" : "highcharts-label-box") + (m ? " highcharts-" + m + "-box" : "")), z.add(t), b = Q(), a.x = b, a.y = (C ? -g : 0) + b), a.width = Math.round(t.width), a.height = Math.round(t.height), z.attr(h(a, u)),
                        u = {})
                };
                var Y = function () {
                    var b = B + R;
                    var a = C ? 0 : g;
                    y(d) && O && ("center" === H || "right" === H) && (b += {
                        center: .5,
                        right: 1
                    } [H] * (d - O.width));
                    if (b !== G.x || a !== G.y) G.attr("x", b), G.hasBoxWidthChanged && (O = G.getBBox(!0), ba()), "undefined" !== typeof a && G.attr("y", a);
                    G.x = b;
                    G.y = a
                };
                var v = function (b, a) {
                    z ? z.attr(b, a) : u[b] = a
                };
                t.onAdd = function () {
                    G.add(t);
                    t.attr({
                        text: b || 0 === b ? b : "",
                        x: a,
                        y: e
                    });
                    z && y(n) && t.attr({
                        anchorX: n,
                        anchorY: w
                    })
                };
                t.widthSetter = function (b) {
                    d = P(b) ? b : null
                };
                t.heightSetter = function (b) {
                    N = b
                };
                t["text-alignSetter"] = function (b) {
                    H =
                        b
                };
                t.paddingSetter = function (b) {
                    y(b) && b !== R && (R = t.padding = b, Y())
                };
                t.paddingLeftSetter = function (b) {
                    y(b) && b !== B && (B = b, Y())
                };
                t.alignSetter = function (b) {
                    b = {
                        left: 0,
                        center: .5,
                        right: 1
                    } [b];
                    b !== q && (q = b, O && t.attr({
                        x: X
                    }))
                };
                t.textSetter = function (b) {
                    "undefined" !== typeof b && G.attr({
                        text: b
                    });
                    ba();
                    Y()
                };
                t["stroke-widthSetter"] = function (b, a) {
                    b && (I = !0);
                    T = this["stroke-width"] = b;
                    v(a, b)
                };
                x ? t.rSetter = function (b, a) {
                    v(a, b)
                } : t.strokeSetter = t.fillSetter = t.rSetter = function (b, a) {
                    "r" !== a && ("fill" === a && b && (I = !0), t[a] = b);
                    v(a, b)
                };
                t.anchorXSetter = function (b, a) {
                    n = t.anchorX = b;
                    v(a, Math.round(b) - Q() - X)
                };
                t.anchorYSetter = function (b, a) {
                    w = t.anchorY = b;
                    v(a, b - V)
                };
                t.xSetter = function (b) {
                    t.x = b;
                    q && (b -= q * ((d || O.width) + 2 * R), t["forceAnimate:x"] = !0);
                    X = Math.round(b);
                    t.attr("translateX", X)
                };
                t.ySetter = function (b) {
                    V = t.y = Math.round(b);
                    t.attr("translateY", V)
                };
                var D = t.css;
                f = {
                    css: function (b) {
                        if (b) {
                            var a = {};
                            b = k(b);
                            t.textProps.forEach(function (e) {
                                "undefined" !== typeof b[e] && (a[e] = b[e], delete b[e])
                            });
                            G.css(a);
                            "width" in a && ba();
                            "fontSize" in a && (ba(), Y())
                        }
                        return D.call(t,
                            b)
                    },
                    getBBox: function () {
                        return {
                            width: O.width + 2 * R,
                            height: O.height + 2 * R,
                            x: O.x - R,
                            y: O.y - R
                        }
                    },
                    destroy: function () {
                        l(t.element, "mouseenter");
                        l(t.element, "mouseleave");
                        G && (G = G.destroy());
                        z && (z = z.destroy());
                        U.prototype.destroy.call(t);
                        t = p = ba = Y = v = null
                    }
                };
                x || (f.shadow = function (b) {
                    b && (ba(), z && z.shadow(b));
                    return t
                });
                return h(t, f)
            }
        });
        d.Renderer = g
    });
    S(r, "parts/Html.js", [r["parts/Globals.js"], r["parts/Utilities.js"]], function (d, g) {
        var r = g.attr,
            v = g.createElement,
            J = g.css,
            M = g.defined,
            E = g.extend,
            A = g.pick,
            F = g.pInt,
            L = d.isFirefox,
            y = d.isMS,
            u = d.isWebKit,
            D = d.SVGElement;
        g = d.SVGRenderer;
        var h = d.win;
        E(D.prototype, {
            htmlCss: function (d) {
                var q = "SPAN" === this.element.tagName && d && "width" in d,
                    N = A(q && d.width, void 0);
                if (q) {
                    delete d.width;
                    this.textWidth = N;
                    var f = !0
                }
                d && "ellipsis" === d.textOverflow && (d.whiteSpace = "nowrap", d.overflow = "hidden");
                this.styles = E(this.styles, d);
                J(this.element, d);
                f && this.htmlUpdateTransform();
                return this
            },
            htmlGetBBox: function () {
                var d = this.element;
                return {
                    x: d.offsetLeft,
                    y: d.offsetTop,
                    width: d.offsetWidth,
                    height: d.offsetHeight
                }
            },
            htmlUpdateTransform: function () {
                if (this.added) {
                    var d = this.renderer,
                        q = this.element,
                        h = this.translateX || 0,
                        f = this.translateY || 0,
                        c = this.x || 0,
                        k = this.y || 0,
                        m = this.textAlign || "left",
                        e = {
                            left: 0,
                            center: .5,
                            right: 1
                        } [m],
                        a = this.styles,
                        l = a && a.whiteSpace;
                    J(q, {
                        marginLeft: h,
                        marginTop: f
                    });
                    !d.styledMode && this.shadows && this.shadows.forEach(function (a) {
                        J(a, {
                            marginLeft: h + 1,
                            marginTop: f + 1
                        })
                    });
                    this.inverted && [].forEach.call(q.childNodes, function (a) {
                        d.invertChild(a, q)
                    });
                    if ("SPAN" === q.tagName) {
                        a = this.rotation;
                        var t = this.textWidth &&
                            F(this.textWidth),
                            z = [a, m, q.innerHTML, this.textWidth, this.textAlign].join(),
                            x;
                        (x = t !== this.oldTextWidth) && !(x = t > this.oldTextWidth) && ((x = this.textPxLength) || (J(q, {
                            width: "",
                            whiteSpace: l || "nowrap"
                        }), x = q.offsetWidth), x = x > t);
                        x && (/[ \-]/.test(q.textContent || q.innerText) || "ellipsis" === q.style.textOverflow) ? (J(q, {
                            width: t + "px",
                            display: "block",
                            whiteSpace: l || "normal"
                        }), this.oldTextWidth = t, this.hasBoxWidthChanged = !0) : this.hasBoxWidthChanged = !1;
                        z !== this.cTT && (l = d.fontMetrics(q.style.fontSize, q).b, !M(a) || a === (this.oldRotation ||
                            0) && m === this.oldAlign || this.setSpanRotation(a, e, l), this.getSpanCorrection(!M(a) && this.textPxLength || q.offsetWidth, l, e, a, m));
                        J(q, {
                            left: c + (this.xCorr || 0) + "px",
                            top: k + (this.yCorr || 0) + "px"
                        });
                        this.cTT = z;
                        this.oldRotation = a;
                        this.oldAlign = m
                    }
                } else this.alignOnAdd = !0
            },
            setSpanRotation: function (d, q, h) {
                var f = {},
                    c = this.renderer.getTransformKey();
                f[c] = f.transform = "rotate(" + d + "deg)";
                f[c + (L ? "Origin" : "-origin")] = f.transformOrigin = 100 * q + "% " + h + "px";
                J(this.element, f)
            },
            getSpanCorrection: function (d, q, h) {
                this.xCorr = -d * h;
                this.yCorr = -q
            }
        });
        E(g.prototype, {
            getTransformKey: function () {
                return y && !/Edge/.test(h.navigator.userAgent) ? "-ms-transform" : u ? "-webkit-transform" : L ? "MozTransform" : h.opera ? "-o-transform" : ""
            },
            html: function (d, q, h) {
                var f = this.createElement("span"),
                    c = f.element,
                    k = f.renderer,
                    m = k.isSVG,
                    e = function (a, e) {
                        ["opacity", "visibility"].forEach(function (c) {
                            a[c + "Setter"] = function (f, l, k) {
                                var t = a.div ? a.div.style : e;
                                D.prototype[c + "Setter"].call(this, f, l, k);
                                t && (t[l] = f)
                            }
                        });
                        a.addedSetters = !0
                    };
                f.textSetter = function (a) {
                    a !== c.innerHTML &&
                        (delete this.bBox, delete this.oldTextWidth);
                    this.textStr = a;
                    c.innerHTML = A(a, "");
                    f.doTransform = !0
                };
                m && e(f, f.element.style);
                f.xSetter = f.ySetter = f.alignSetter = f.rotationSetter = function (a, e) {
                    "align" === e && (e = "textAlign");
                    f[e] = a;
                    f.doTransform = !0
                };
                f.afterSetters = function () {
                    this.doTransform && (this.htmlUpdateTransform(), this.doTransform = !1)
                };
                f.attr({
                    text: d,
                    x: Math.round(q),
                    y: Math.round(h)
                }).css({
                    position: "absolute"
                });
                k.styledMode || f.css({
                    fontFamily: this.style.fontFamily,
                    fontSize: this.style.fontSize
                });
                c.style.whiteSpace =
                    "nowrap";
                f.css = f.htmlCss;
                m && (f.add = function (a) {
                    var l = k.box.parentNode,
                        t = [];
                    if (this.parentGroup = a) {
                        var m = a.div;
                        if (!m) {
                            for (; a;) t.push(a), a = a.parentGroup;
                            t.reverse().forEach(function (a) {
                                function c(e, c) {
                                    a[c] = e;
                                    "translateX" === c ? x.left = e + "px" : x.top = e + "px";
                                    a.doTransform = !0
                                }
                                var k = r(a.element, "class");
                                m = a.div = a.div || v("div", k ? {
                                        className: k
                                    } : void 0, {
                                        position: "absolute",
                                        left: (a.translateX || 0) + "px",
                                        top: (a.translateY || 0) + "px",
                                        display: a.display,
                                        opacity: a.opacity,
                                        pointerEvents: a.styles && a.styles.pointerEvents
                                    }, m ||
                                    l);
                                var x = m.style;
                                E(a, {
                                    classSetter: function (a) {
                                        return function (e) {
                                            this.element.setAttribute("class", e);
                                            a.className = e
                                        }
                                    }(m),
                                    on: function () {
                                        t[0].div && f.on.apply({
                                            element: t[0].div
                                        }, arguments);
                                        return a
                                    },
                                    translateXSetter: c,
                                    translateYSetter: c
                                });
                                a.addedSetters || e(a)
                            })
                        }
                    } else m = l;
                    m.appendChild(c);
                    f.added = !0;
                    f.alignOnAdd && f.htmlUpdateTransform();
                    return f
                });
                return f
            }
        })
    });
    S(r, "parts/Tick.js", [r["parts/Globals.js"], r["parts/Utilities.js"]], function (d, g) {
        var r = g.clamp,
            v = g.correctFloat,
            J = g.defined,
            M = g.destroyObjectProperties,
            E = g.extend,
            A = g.isNumber,
            F = g.merge,
            L = g.objectEach,
            y = g.pick,
            u = d.fireEvent,
            D = d.deg2rad;
        g = function () {
            function h(d, q, h, f, c) {
                this.isNewLabel = this.isNew = !0;
                this.axis = d;
                this.pos = q;
                this.type = h || "";
                this.parameters = c || {};
                this.tickmarkOffset = this.parameters.tickmarkOffset;
                this.options = this.parameters.options;
                h || f || this.addLabel()
            }
            h.prototype.addLabel = function () {
                var d = this,
                    q = d.axis,
                    h = q.options,
                    f = q.chart,
                    c = q.categories,
                    k = q.names,
                    m = d.pos,
                    e = y(d.options && d.options.labels, h.labels),
                    a = q.tickPositions,
                    l = m === a[0],
                    t = m ===
                    a[a.length - 1];
                k = this.parameters.category || (c ? y(c[m], k[m], m) : m);
                var z = d.label;
                c = (!e.step || 1 === e.step) && 1 === q.tickInterval;
                a = a.info;
                var x, B;
                if (q.isDatetimeAxis && a) {
                    var H = f.time.resolveDTLFormat(h.dateTimeLabelFormats[!h.grid && a.higherRanks[m] || a.unitName]);
                    var u = H.main
                }
                d.isFirst = l;
                d.isLast = t;
                d.formatCtx = {
                    axis: q,
                    chart: f,
                    isFirst: l,
                    isLast: t,
                    dateTimeLabelFormat: u,
                    tickPositionInfo: a,
                    value: q.isLog ? v(q.lin2log(k)) : k,
                    pos: m
                };
                h = q.labelFormatter.call(d.formatCtx, this.formatCtx);
                if (B = H && H.list) d.shortenLabel = function () {
                    for (x =
                        0; x < B.length; x++)
                        if (z.attr({
                                text: q.labelFormatter.call(E(d.formatCtx, {
                                    dateTimeLabelFormat: B[x]
                                }))
                            }), z.getBBox().width < q.getSlotWidth(d) - 2 * y(e.padding, 5)) return;
                    z.attr({
                        text: ""
                    })
                };
                c && q._addedPlotLB && q.isXAxis && d.moveLabel(h, e);
                J(z) || d.movedLabel ? z && z.textStr !== h && !c && (!z.textWidth || e.style && e.style.width || z.styles.width || z.css({
                    width: null
                }), z.attr({
                    text: h
                }), z.textPxLength = z.getBBox().width) : (d.label = z = d.createLabel({
                    x: 0,
                    y: 0
                }, h, e), d.rotation = 0)
            };
            h.prototype.createLabel = function (d, q, h) {
                var f = this.axis,
                    c = f.chart;
                if (d = J(q) && h.enabled ? c.renderer.text(q, d.x, d.y, h.useHTML).add(f.labelGroup) : null) c.styledMode || d.css(F(h.style)), d.textPxLength = d.getBBox().width;
                return d
            };
            h.prototype.destroy = function () {
                M(this, this.axis)
            };
            h.prototype.getPosition = function (d, q, h, f) {
                var c = this.axis,
                    k = c.chart,
                    m = f && k.oldChartHeight || k.chartHeight;
                d = {
                    x: d ? v(c.translate(q + h, null, null, f) + c.transB) : c.left + c.offset + (c.opposite ? (f && k.oldChartWidth || k.chartWidth) - c.right - c.left : 0),
                    y: d ? m - c.bottom + c.offset - (c.opposite ? c.height : 0) : v(m -
                        c.translate(q + h, null, null, f) - c.transB)
                };
                d.y = r(d.y, -1E5, 1E5);
                u(this, "afterGetPosition", {
                    pos: d
                });
                return d
            };
            h.prototype.getLabelPosition = function (d, q, h, f, c, k, m, e) {
                var a = this.axis,
                    l = a.transA,
                    t = a.isLinked && a.linkedParent ? a.linkedParent.reversed : a.reversed,
                    z = a.staggerLines,
                    x = a.tickRotCorr || {
                        x: 0,
                        y: 0
                    },
                    B = c.y,
                    H = f || a.reserveSpaceDefault ? 0 : -a.labelOffset * ("center" === a.labelAlign ? .5 : 1),
                    N = {};
                J(B) || (B = 0 === a.side ? h.rotation ? -8 : -h.getBBox().height : 2 === a.side ? x.y + 8 : Math.cos(h.rotation * D) * (x.y - h.getBBox(!1, 0).height /
                    2));
                d = d + c.x + H + x.x - (k && f ? k * l * (t ? -1 : 1) : 0);
                q = q + B - (k && !f ? k * l * (t ? 1 : -1) : 0);
                z && (h = m / (e || 1) % z, a.opposite && (h = z - h - 1), q += a.labelOffset / z * h);
                N.x = d;
                N.y = Math.round(q);
                u(this, "afterGetLabelPosition", {
                    pos: N,
                    tickmarkOffset: k,
                    index: m
                });
                return N
            };
            h.prototype.getLabelSize = function () {
                return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0
            };
            h.prototype.getMarkPath = function (d, q, h, f, c, k) {
                return k.crispLine(["M", d, q, "L", d + (c ? 0 : -h), q + (c ? h : 0)], f)
            };
            h.prototype.handleOverflow = function (d) {
                var q = this.axis,
                    h =
                    q.options.labels,
                    f = d.x,
                    c = q.chart.chartWidth,
                    k = q.chart.spacing,
                    m = y(q.labelLeft, Math.min(q.pos, k[3]));
                k = y(q.labelRight, Math.max(q.isRadial ? 0 : q.pos + q.len, c - k[1]));
                var e = this.label,
                    a = this.rotation,
                    l = {
                        left: 0,
                        center: .5,
                        right: 1
                    } [q.labelAlign || e.attr("align")],
                    t = e.getBBox().width,
                    z = q.getSlotWidth(this),
                    x = z,
                    B = 1,
                    H, u = {};
                if (a || "justify" !== y(h.overflow, "justify")) 0 > a && f - l * t < m ? H = Math.round(f / Math.cos(a * D) - m) : 0 < a && f + l * t > k && (H = Math.round((c - f) / Math.cos(a * D)));
                else if (c = f + (1 - l) * t, f - l * t < m ? x = d.x + x * (1 - l) - m : c > k && (x = k -
                        d.x + x * l, B = -1), x = Math.min(z, x), x < z && "center" === q.labelAlign && (d.x += B * (z - x - l * (z - Math.min(t, x)))), t > x || q.autoRotation && (e.styles || {}).width) H = x;
                H && (this.shortenLabel ? this.shortenLabel() : (u.width = Math.floor(H), (h.style || {}).textOverflow || (u.textOverflow = "ellipsis"), e.css(u)))
            };
            h.prototype.moveLabel = function (d, q) {
                var h = this,
                    f = h.label,
                    c = !1,
                    k = h.axis,
                    m = k.reversed,
                    e = k.chart.inverted;
                f && f.textStr === d ? (h.movedLabel = f, c = !0, delete h.label) : L(k.ticks, function (a) {
                    c || a.isNew || a === h || !a.label || a.label.textStr !== d ||
                        (h.movedLabel = a.label, c = !0, a.labelPos = h.movedLabel.xy, delete a.label)
                });
                if (!c && (h.labelPos || f)) {
                    var a = h.labelPos || f.xy;
                    f = e ? a.x : m ? 0 : k.width + k.left;
                    k = e ? m ? k.width + k.left : 0 : a.y;
                    h.movedLabel = h.createLabel({
                        x: f,
                        y: k
                    }, d, q);
                    h.movedLabel && h.movedLabel.attr({
                        opacity: 0
                    })
                }
            };
            h.prototype.render = function (h, q, u) {
                var f = this.axis,
                    c = f.horiz,
                    k = this.pos,
                    m = y(this.tickmarkOffset, f.tickmarkOffset);
                k = this.getPosition(c, k, m, q);
                m = k.x;
                var e = k.y;
                f = c && m === f.pos + f.len || !c && e === f.pos ? -1 : 1;
                u = y(u, 1);
                this.isActive = !0;
                this.renderGridLine(q,
                    u, f);
                this.renderMark(k, u, f);
                this.renderLabel(k, q, u, h);
                this.isNew = !1;
                d.fireEvent(this, "afterRender")
            };
            h.prototype.renderGridLine = function (d, q, h) {
                var f = this.axis,
                    c = f.options,
                    k = this.gridLine,
                    m = {},
                    e = this.pos,
                    a = this.type,
                    l = y(this.tickmarkOffset, f.tickmarkOffset),
                    t = f.chart.renderer,
                    z = a ? a + "Grid" : "grid",
                    x = c[z + "LineWidth"],
                    B = c[z + "LineColor"];
                c = c[z + "LineDashStyle"];
                k || (f.chart.styledMode || (m.stroke = B, m["stroke-width"] = x, c && (m.dashstyle = c)), a || (m.zIndex = 1), d && (q = 0), this.gridLine = k = t.path().attr(m).addClass("highcharts-" +
                    (a ? a + "-" : "") + "grid-line").add(f.gridGroup));
                if (k && (h = f.getPlotLinePath({
                        value: e + l,
                        lineWidth: k.strokeWidth() * h,
                        force: "pass",
                        old: d
                    }))) k[d || this.isNew ? "attr" : "animate"]({
                    d: h,
                    opacity: q
                })
            };
            h.prototype.renderMark = function (d, q, h) {
                var f = this.axis,
                    c = f.options,
                    k = f.chart.renderer,
                    m = this.type,
                    e = m ? m + "Tick" : "tick",
                    a = f.tickSize(e),
                    l = this.mark,
                    t = !l,
                    z = d.x;
                d = d.y;
                var x = y(c[e + "Width"], !m && f.isXAxis ? 1 : 0);
                c = c[e + "Color"];
                a && (f.opposite && (a[0] = -a[0]), t && (this.mark = l = k.path().addClass("highcharts-" + (m ? m + "-" : "") + "tick").add(f.axisGroup),
                    f.chart.styledMode || l.attr({
                        stroke: c,
                        "stroke-width": x
                    })), l[t ? "attr" : "animate"]({
                    d: this.getMarkPath(z, d, a[0], l.strokeWidth() * h, f.horiz, k),
                    opacity: q
                }))
            };
            h.prototype.renderLabel = function (d, q, h, f) {
                var c = this.axis,
                    k = c.horiz,
                    m = c.options,
                    e = this.label,
                    a = m.labels,
                    l = a.step;
                c = y(this.tickmarkOffset, c.tickmarkOffset);
                var t = !0,
                    z = d.x;
                d = d.y;
                e && A(z) && (e.xy = d = this.getLabelPosition(z, d, e, k, a, c, f, l), this.isFirst && !this.isLast && !y(m.showFirstLabel, 1) || this.isLast && !this.isFirst && !y(m.showLastLabel, 1) ? t = !1 : !k || a.step ||
                    a.rotation || q || 0 === h || this.handleOverflow(d), l && f % l && (t = !1), t && A(d.y) ? (d.opacity = h, e[this.isNewLabel ? "attr" : "animate"](d), this.isNewLabel = !1) : (e.attr("y", -9999), this.isNewLabel = !0))
            };
            h.prototype.replaceMovedLabel = function () {
                var d = this.label,
                    q = this.axis,
                    h = q.reversed,
                    f = this.axis.chart.inverted;
                if (d && !this.isNew) {
                    var c = f ? d.xy.x : h ? q.left : q.width + q.left;
                    h = f ? h ? q.width + q.top : q.top : d.xy.y;
                    d.animate({
                        x: c,
                        y: h,
                        opacity: 0
                    }, void 0, d.destroy);
                    delete this.label
                }
                q.isDirty = !0;
                this.label = this.movedLabel;
                delete this.movedLabel
            };
            return h
        }();
        d.Tick = g;
        return d.Tick
    });
    S(r, "parts/Time.js", [r["parts/Globals.js"], r["parts/Utilities.js"]], function (d, g) {
        var r = g.defined,
            v = g.error,
            J = g.extend,
            M = g.isObject,
            E = g.merge,
            A = g.objectEach,
            F = g.pad,
            L = g.pick,
            y = g.splat,
            u = g.timeUnits,
            D = d.win;
        g = function () {
            function h(d) {
                this.options = {};
                this.variableTimezone = this.useUTC = !1;
                this.Date = D.Date;
                this.getTimezoneOffset = this.timezoneOffsetFunction();
                this.update(d)
            }
            h.prototype.get = function (d, q) {
                if (this.variableTimezone || this.timezoneOffset) {
                    var h = q.getTime(),
                        f = h - this.getTimezoneOffset(q);
                    q.setTime(f);
                    d = q["getUTC" + d]();
                    q.setTime(h);
                    return d
                }
                return this.useUTC ? q["getUTC" + d]() : q["get" + d]()
            };
            h.prototype.set = function (d, q, h) {
                if (this.variableTimezone || this.timezoneOffset) {
                    if ("Milliseconds" === d || "Seconds" === d || "Minutes" === d) return q["setUTC" + d](h);
                    var f = this.getTimezoneOffset(q);
                    f = q.getTime() - f;
                    q.setTime(f);
                    q["setUTC" + d](h);
                    d = this.getTimezoneOffset(q);
                    f = q.getTime() + d;
                    return q.setTime(f)
                }
                return this.useUTC ? q["setUTC" + d](h) : q["set" + d](h)
            };
            h.prototype.update = function (d) {
                var q =
                    L(d && d.useUTC, !0);
                this.options = d = E(!0, this.options || {}, d);
                this.Date = d.Date || D.Date || Date;
                this.timezoneOffset = (this.useUTC = q) && d.timezoneOffset;
                this.getTimezoneOffset = this.timezoneOffsetFunction();
                this.variableTimezone = !(q && !d.getTimezoneOffset && !d.timezone)
            };
            h.prototype.makeTime = function (h, q, u, f, c, k) {
                if (this.useUTC) {
                    var m = this.Date.UTC.apply(0, arguments);
                    var e = this.getTimezoneOffset(m);
                    m += e;
                    var a = this.getTimezoneOffset(m);
                    e !== a ? m += a - e : e - 36E5 !== this.getTimezoneOffset(m - 36E5) || d.isSafari || (m -= 36E5)
                } else m =
                    (new this.Date(h, q, L(u, 1), L(f, 0), L(c, 0), L(k, 0))).getTime();
                return m
            };
            h.prototype.timezoneOffsetFunction = function () {
                var d = this,
                    q = this.options,
                    h = D.moment;
                if (!this.useUTC) return function (f) {
                    return 6E4 * (new Date(f.toString())).getTimezoneOffset()
                };
                if (q.timezone) {
                    if (h) return function (f) {
                        return 6E4 * -h.tz(f, q.timezone).utcOffset()
                    };
                    v(25)
                }
                return this.useUTC && q.getTimezoneOffset ? function (f) {
                    return 6E4 * q.getTimezoneOffset(f)
                } : function () {
                    return 6E4 * (d.timezoneOffset || 0)
                }
            };
            h.prototype.dateFormat = function (h, q,
                u) {
                var f;
                if (!r(q) || isNaN(q)) return (null === (f = d.defaultOptions.lang) || void 0 === f ? void 0 : f.invalidDate) || "";
                h = L(h, "%Y-%m-%d %H:%M:%S");
                var c = this;
                f = new this.Date(q);
                var k = this.get("Hours", f),
                    m = this.get("Day", f),
                    e = this.get("Date", f),
                    a = this.get("Month", f),
                    l = this.get("FullYear", f),
                    t = d.defaultOptions.lang,
                    z = null === t || void 0 === t ? void 0 : t.weekdays,
                    x = null === t || void 0 === t ? void 0 : t.shortWeekdays;
                f = J({
                    a: x ? x[m] : z[m].substr(0, 3),
                    A: z[m],
                    d: F(e),
                    e: F(e, 2, " "),
                    w: m,
                    b: t.shortMonths[a],
                    B: t.months[a],
                    m: F(a + 1),
                    o: a + 1,
                    y: l.toString().substr(2,
                        2),
                    Y: l,
                    H: F(k),
                    k: k,
                    I: F(k % 12 || 12),
                    l: k % 12 || 12,
                    M: F(this.get("Minutes", f)),
                    p: 12 > k ? "AM" : "PM",
                    P: 12 > k ? "am" : "pm",
                    S: F(f.getSeconds()),
                    L: F(Math.floor(q % 1E3), 3)
                }, d.dateFormats);
                A(f, function (a, e) {
                    for (; - 1 !== h.indexOf("%" + e);) h = h.replace("%" + e, "function" === typeof a ? a.call(c, q) : a)
                });
                return u ? h.substr(0, 1).toUpperCase() + h.substr(1) : h
            };
            h.prototype.resolveDTLFormat = function (d) {
                return M(d, !0) ? d : (d = y(d), {
                    main: d[0],
                    from: d[1],
                    to: d[2]
                })
            };
            h.prototype.getTimeTicks = function (d, h, g, f) {
                var c = this,
                    k = [],
                    m = {};
                var e = new c.Date(h);
                var a = d.unitRange,
                    l = d.count || 1,
                    t;
                f = L(f, 1);
                if (r(h)) {
                    c.set("Milliseconds", e, a >= u.second ? 0 : l * Math.floor(c.get("Milliseconds", e) / l));
                    a >= u.second && c.set("Seconds", e, a >= u.minute ? 0 : l * Math.floor(c.get("Seconds", e) / l));
                    a >= u.minute && c.set("Minutes", e, a >= u.hour ? 0 : l * Math.floor(c.get("Minutes", e) / l));
                    a >= u.hour && c.set("Hours", e, a >= u.day ? 0 : l * Math.floor(c.get("Hours", e) / l));
                    a >= u.day && c.set("Date", e, a >= u.month ? 1 : Math.max(1, l * Math.floor(c.get("Date", e) / l)));
                    if (a >= u.month) {
                        c.set("Month", e, a >= u.year ? 0 : l * Math.floor(c.get("Month",
                            e) / l));
                        var z = c.get("FullYear", e)
                    }
                    a >= u.year && c.set("FullYear", e, z - z % l);
                    a === u.week && (z = c.get("Day", e), c.set("Date", e, c.get("Date", e) - z + f + (z < f ? -7 : 0)));
                    z = c.get("FullYear", e);
                    f = c.get("Month", e);
                    var x = c.get("Date", e),
                        q = c.get("Hours", e);
                    h = e.getTime();
                    c.variableTimezone && (t = g - h > 4 * u.month || c.getTimezoneOffset(h) !== c.getTimezoneOffset(g));
                    h = e.getTime();
                    for (e = 1; h < g;) k.push(h), h = a === u.year ? c.makeTime(z + e * l, 0) : a === u.month ? c.makeTime(z, f + e * l) : !t || a !== u.day && a !== u.week ? t && a === u.hour && 1 < l ? c.makeTime(z, f, x, q + e * l) :
                        h + a * l : c.makeTime(z, f, x + e * l * (a === u.day ? 1 : 7)), e++;
                    k.push(h);
                    a <= u.hour && 1E4 > k.length && k.forEach(function (a) {
                        0 === a % 18E5 && "000000000" === c.dateFormat("%H%M%S%L", a) && (m[a] = "day")
                    })
                }
                k.info = J(d, {
                    higherRanks: m,
                    totalRange: a * l
                });
                return k
            };
            h.defaultOptions = {
                Date: void 0,
                getTimezoneOffset: void 0,
                timezone: void 0,
                timezoneOffset: 0,
                useUTC: !0
            };
            return h
        }();
        d.Time = g;
        return d.Time
    });
    S(r, "parts/Options.js", [r["parts/Globals.js"], r["parts/Time.js"], r["parts/Color.js"], r["parts/Utilities.js"]], function (d, g, r, v) {
        r = r.parse;
        var J = v.merge;
        d.defaultOptions = {
            colors: "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),
            symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
            lang: {
                loading: "Loading...",
                months: "January February March April May June July August September October November December".split(" "),
                shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
                weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
                decimalPoint: ".",
                numericSymbols: "kMGTPE".split(""),
                resetZoom: "Reset zoom",
                resetZoomTitle: "Reset zoom level 1:1",
                thousandsSep: " "
            },
            global: {},
            time: g.defaultOptions,
            chart: {
                styledMode: !1,
                borderRadius: 0,
                colorCount: 10,
                defaultSeriesType: "line",
                ignoreHiddenSeries: !0,
                spacing: [10, 10, 15, 10],
                resetZoomButton: {
                    theme: {
                        zIndex: 6
                    },
                    position: {
                        align: "right",
                        x: -10,
                        y: 10
                    }
                },
                width: null,
                height: null,
                borderColor: "#335cad",
                backgroundColor: "#ffffff",
                plotBorderColor: "#cccccc"
            },
            title: {
                text: "Chart title",
                align: "center",
                margin: 15,
                widthAdjust: -44
            },
            subtitle: {
                text: "",
                align: "center",
                widthAdjust: -44
            },
            caption: {
                margin: 15,
                text: "",
                align: "left",
                verticalAlign: "bottom"
            },
            plotOptions: {},
            labels: {
                style: {
                    position: "absolute",
                    color: "#333333"
                }
            },
            legend: {
                enabled: !0,
                align: "center",
                alignColumns: !0,
                layout: "horizontal",
                labelFormatter: function () {
                    return this.name
                },
                borderColor: "#999999",
                borderRadius: 0,
                navigation: {
                    activeColor: "#003399",
                    inactiveColor: "#cccccc"
                },
                itemStyle: {
                    color: "#333333",
                    cursor: "pointer",
                    fontSize: "12px",
                    fontWeight: "bold",
                    textOverflow: "ellipsis"
                },
                itemHoverStyle: {
                    color: "#000000"
                },
                itemHiddenStyle: {
                    color: "#cccccc"
                },
                shadow: !1,
                itemCheckboxStyle: {
                    position: "absolute",
                    width: "13px",
                    height: "13px"
                },
                squareSymbol: !0,
                symbolPadding: 5,
                verticalAlign: "bottom",
                x: 0,
                y: 0,
                title: {
                    style: {
                        fontWeight: "bold"
                    }
                }
            },
            loading: {
                labelStyle: {
                    fontWeight: "bold",
                    position: "relative",
                    top: "45%"
                },
                style: {
                    position: "absolute",
                    backgroundColor: "#ffffff",
                    opacity: .5,
                    textAlign: "center"
                }
            },
            tooltip: {
                enabled: !0,
                animation: d.svg,
                borderRadius: 3,
                dateTimeLabelFormats: {
                    millisecond: "%A, %b %e, %H:%M:%S.%L",
                    second: "%A, %b %e, %H:%M:%S",
                    minute: "%A, %b %e, %H:%M",
                    hour: "%A, %b %e, %H:%M",
                    day: "%A, %b %e, %Y",
                    week: "Week from %A, %b %e, %Y",
                    month: "%B %Y",
                    year: "%Y"
                },
                footerFormat: "",
                padding: 8,
                snap: d.isTouchDevice ? 25 : 10,
                headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>',
                pointFormat: '<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.y}</b><br/>',
                backgroundColor: r("#f7f7f7").setOpacity(.85).get(),
                borderWidth: 1,
                shadow: !0,
                style: {
                    color: "#333333",
                    cursor: "default",
                    fontSize: "12px",
                    pointerEvents: "none",
                    whiteSpace: "nowrap"
                }
            },
            credits: {
                enabled: !0,
                href: "https://stream-universe.id/",
                position: {
                    align: "right",
                    x: -10,
                    verticalAlign: "bottom",
                    y: -5
                },
                style: {
                    cursor: "pointer",
                    color: "#999999",
                    fontSize: "9px"
                },
                text: "Stream Universe"
            }
        };
        d.setOptions = function (g) {
            d.defaultOptions = J(!0, d.defaultOptions, g);
            (g.time || g.global) && d.time.update(J(d.defaultOptions.global, d.defaultOptions.time, g.global, g.time));
            return d.defaultOptions
        };
        d.getOptions = function () {
            return d.defaultOptions
        };
        d.defaultPlotOptions = d.defaultOptions.plotOptions;
        d.time = new g(J(d.defaultOptions.global, d.defaultOptions.time));
        d.dateFormat =
            function (g, v, A) {
                return d.time.dateFormat(g, v, A)
            };
        ""
    });
    S(r, "parts/Axis.js", [r["parts/Globals.js"], r["parts/Color.js"], r["parts/Tick.js"], r["parts/Utilities.js"]], function (d, g, r, v) {
        var J = g.parse,
            M = v.addEvent,
            E = v.animObject,
            A = v.arrayMax,
            F = v.arrayMin,
            L = v.clamp,
            y = v.correctFloat,
            u = v.defined,
            D = v.destroyObjectProperties,
            h = v.error,
            N = v.extend,
            q = v.fireEvent,
            P = v.format,
            f = v.getMagnitude,
            c = v.isArray,
            k = v.isFunction,
            m = v.isNumber,
            e = v.isString,
            a = v.merge,
            l = v.normalizeTickInterval,
            t = v.objectEach,
            z = v.pick,
            x = v.relativeLength,
            B = v.removeEvent,
            H = v.splat,
            Q = v.syncTimeout,
            I = d.defaultOptions,
            K = d.deg2rad;
        g = function () {
            this.init.apply(this, arguments)
        };
        N(g.prototype, {
            defaultOptions: {
                dateTimeLabelFormats: {
                    millisecond: {
                        main: "%H:%M:%S.%L",
                        range: !1
                    },
                    second: {
                        main: "%H:%M:%S",
                        range: !1
                    },
                    minute: {
                        main: "%H:%M",
                        range: !1
                    },
                    hour: {
                        main: "%H:%M",
                        range: !1
                    },
                    day: {
                        main: "%e. %b"
                    },
                    week: {
                        main: "%e. %b"
                    },
                    month: {
                        main: "%b '%y"
                    },
                    year: {
                        main: "%Y"
                    }
                },
                endOnTick: !1,
                labels: {
                    enabled: !0,
                    indentation: 10,
                    x: 0,
                    style: {
                        color: "#666666",
                        cursor: "default",
                        fontSize: "11px"
                    }
                },
                maxPadding: .01,
                minorTickLength: 2,
                minorTickPosition: "outside",
                minPadding: .01,
                showEmpty: !0,
                startOfWeek: 1,
                startOnTick: !1,
                tickLength: 10,
                tickPixelInterval: 100,
                tickmarkPlacement: "between",
                tickPosition: "outside",
                title: {
                    align: "middle",
                    style: {
                        color: "#666666"
                    }
                },
                type: "linear",
                minorGridLineColor: "#f2f2f2",
                minorGridLineWidth: 1,
                minorTickColor: "#999999",
                lineColor: "#ccd6eb",
                lineWidth: 1,
                gridLineColor: "#e6e6e6",
                tickColor: "#ccd6eb"
            },
            defaultYAxisOptions: {
                endOnTick: !0,
                maxPadding: .05,
                minPadding: .05,
                tickPixelInterval: 72,
                showLastLabel: !0,
                labels: {
                    x: -8
                },
                startOnTick: !0,
                title: {
                    rotation: 270,
                    text: "Values"
                },
                stackLabels: {
                    allowOverlap: !1,
                    enabled: !1,
                    crop: !0,
                    overflow: "justify",
                    formatter: function () {
                        var a = this.axis.chart.numberFormatter;
                        return a(this.total, -1)
                    },
                    style: {
                        color: "#000000",
                        fontSize: "11px",
                        fontWeight: "bold",
                        textOutline: "1px contrast"
                    }
                },
                gridLineWidth: 1,
                lineWidth: 0
            },
            defaultLeftAxisOptions: {
                labels: {
                    x: -15
                },
                title: {
                    rotation: 270
                }
            },
            defaultRightAxisOptions: {
                labels: {
                    x: 15
                },
                title: {
                    rotation: 90
                }
            },
            defaultBottomAxisOptions: {
                labels: {
                    autoRotation: [-45],
                    x: 0
                },
                margin: 15,
                title: {
                    rotation: 0
                }
            },
            defaultTopAxisOptions: {
                labels: {
                    autoRotation: [-45],
                    x: 0
                },
                margin: 15,
                title: {
                    rotation: 0
                }
            },
            init: function (a, b) {
                var e = b.isX,
                    c = this;
                c.chart = a;
                c.horiz = a.inverted && !c.isZAxis ? !e : e;
                c.isXAxis = e;
                c.coll = c.coll || (e ? "xAxis" : "yAxis");
                q(this, "init", {
                    userOptions: b
                });
                c.opposite = b.opposite;
                c.side = b.side || (c.horiz ? c.opposite ? 0 : 2 : c.opposite ? 1 : 3);
                c.setOptions(b);
                var n = this.options,
                    f = n.type;
                c.labelFormatter = n.labels.formatter || c.defaultLabelFormatter;
                c.userOptions = b;
                c.minPixelPadding = 0;
                c.reversed =
                    n.reversed;
                c.visible = !1 !== n.visible;
                c.zoomEnabled = !1 !== n.zoomEnabled;
                c.hasNames = "category" === f || !0 === n.categories;
                c.categories = n.categories || c.hasNames;
                c.names || (c.names = [], c.names.keys = {});
                c.plotLinesAndBandsGroups = {};
                c.isLog = "logarithmic" === f;
                c.isDatetimeAxis = "datetime" === f;
                c.positiveValuesOnly = c.isLog && !c.allowNegativeLog;
                c.isLinked = u(n.linkedTo);
                c.ticks = {};
                c.labelEdge = [];
                c.minorTicks = {};
                c.plotLinesAndBands = [];
                c.alternateBands = {};
                c.len = 0;
                c.minRange = c.userMinRange = n.minRange || n.maxZoom;
                c.range =
                    n.range;
                c.offset = n.offset || 0;
                c.stacks = {};
                c.oldStacks = {};
                c.stacksTouched = 0;
                c.max = null;
                c.min = null;
                c.crosshair = z(n.crosshair, H(a.options.tooltip.crosshairs)[e ? 0 : 1], !1);
                b = c.options.events; - 1 === a.axes.indexOf(c) && (e ? a.axes.splice(a.xAxis.length, 0, c) : a.axes.push(c), a[c.coll].push(c));
                c.series = c.series || [];
                a.inverted && !c.isZAxis && e && "undefined" === typeof c.reversed && (c.reversed = !0);
                t(b, function (b, a) {
                    k(b) && M(c, a, b)
                });
                c.lin2log = n.linearToLogConverter || c.lin2log;
                c.isLog && (c.val2lin = c.log2lin, c.lin2val = c.lin2log);
                q(this, "afterInit")
            },
            setOptions: function (e) {
                this.options = a(this.defaultOptions, "yAxis" === this.coll && this.defaultYAxisOptions, [this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side], a(I[this.coll], e));
                q(this, "afterSetOptions", {
                    userOptions: e
                })
            },
            defaultLabelFormatter: function () {
                var a = this.axis,
                    b = this.value,
                    e = a.chart.time,
                    c = a.categories,
                    f = this.dateTimeLabelFormat,
                    l = I.lang,
                    k = l.numericSymbols;
                l = l.numericSymbolMagnitude || 1E3;
                var t = k &&
                    k.length,
                    p = a.options.labels.format;
                a = a.isLog ? Math.abs(b) : a.tickInterval;
                var m = this.chart,
                    d = m.numberFormatter;
                if (p) var x = P(p, this, m);
                else if (c) x = b;
                else if (f) x = e.dateFormat(f, b);
                else if (t && 1E3 <= a)
                    for (; t-- && "undefined" === typeof x;) e = Math.pow(l, t + 1), a >= e && 0 === 10 * b % e && null !== k[t] && 0 !== b && (x = d(b / e, -1) + k[t]);
                "undefined" === typeof x && (x = 1E4 <= Math.abs(b) ? d(b, -1) : d(b, -1, void 0, ""));
                return x
            },
            getSeriesExtremes: function () {
                var a = this,
                    b = a.chart,
                    e;
                q(this, "getSeriesExtremes", null, function () {
                    a.hasVisibleSeries = !1;
                    a.dataMin = a.dataMax = a.threshold = null;
                    a.softThreshold = !a.isXAxis;
                    a.buildStacks && a.buildStacks();
                    a.series.forEach(function (c) {
                        if (c.visible || !b.options.chart.ignoreHiddenSeries) {
                            var n = c.options,
                                f = n.threshold;
                            a.hasVisibleSeries = !0;
                            a.positiveValuesOnly && 0 >= f && (f = null);
                            if (a.isXAxis) {
                                if (n = c.xData, n.length) {
                                    e = c.getXExtremes(n);
                                    var w = e.min;
                                    var l = e.max;
                                    m(w) || w instanceof Date || (n = n.filter(m), e = c.getXExtremes(n), w = e.min, l = e.max);
                                    n.length && (a.dataMin = Math.min(z(a.dataMin, w), w), a.dataMax = Math.max(z(a.dataMax,
                                        l), l))
                                }
                            } else if (c.getExtremes(), l = c.dataMax, w = c.dataMin, u(w) && u(l) && (a.dataMin = Math.min(z(a.dataMin, w), w), a.dataMax = Math.max(z(a.dataMax, l), l)), u(f) && (a.threshold = f), !n.softThreshold || a.positiveValuesOnly) a.softThreshold = !1
                        }
                    })
                });
                q(this, "afterGetSeriesExtremes")
            },
            translate: function (a, b, e, c, f, l) {
                var n = this.linkedParent || this,
                    w = 1,
                    C = 0,
                    k = c ? n.oldTransA : n.transA;
                c = c ? n.oldMin : n.min;
                var t = n.minPixelPadding;
                f = (n.isOrdinal || n.isBroken || n.isLog && f) && n.lin2val;
                k || (k = n.transA);
                e && (w *= -1, C = n.len);
                n.reversed && (w *=
                    -1, C -= w * (n.sector || n.len));
                b ? (a = (a * w + C - t) / k + c, f && (a = n.lin2val(a))) : (f && (a = n.val2lin(a)), a = m(c) ? w * (a - c) * k + C + w * t + (m(l) ? k * l : 0) : void 0);
                return a
            },
            toPixels: function (a, b) {
                return this.translate(a, !1, !this.horiz, null, !0) + (b ? 0 : this.pos)
            },
            toValue: function (a, b) {
                return this.translate(a - (b ? 0 : this.pos), !0, !this.horiz, null, !0)
            },
            getPlotLinePath: function (a) {
                var b = this,
                    e = b.chart,
                    c = b.left,
                    n = b.top,
                    f = a.old,
                    l = a.value,
                    k = a.translatedValue,
                    p = a.lineWidth,
                    t = a.force,
                    d, x, G, h, B = f && e.oldChartHeight || e.chartHeight,
                    u = f && e.oldChartWidth ||
                    e.chartWidth,
                    H, g = b.transB,
                    K = function (b, a, e) {
                        if ("pass" !== t && b < a || b > e) t ? b = L(b, a, e) : H = !0;
                        return b
                    };
                a = {
                    value: l,
                    lineWidth: p,
                    old: f,
                    force: t,
                    acrossPanes: a.acrossPanes,
                    translatedValue: k
                };
                q(this, "getPlotLinePath", a, function (a) {
                    k = z(k, b.translate(l, null, null, f));
                    k = L(k, -1E5, 1E5);
                    d = G = Math.round(k + g);
                    x = h = Math.round(B - k - g);
                    m(k) ? b.horiz ? (x = n, h = B - b.bottom, d = G = K(d, c, c + b.width)) : (d = c, G = u - b.right, x = h = K(x, n, n + b.height)) : (H = !0, t = !1);
                    a.path = H && !t ? null : e.renderer.crispLine(["M", d, x, "L", G, h], p || 1)
                });
                return a.path
            },
            getLinearTickPositions: function (a,
                b, e) {
                var c = y(Math.floor(b / a) * a);
                e = y(Math.ceil(e / a) * a);
                var n = [],
                    f;
                y(c + a) === c && (f = 20);
                if (this.single) return [b];
                for (b = c; b <= e;) {
                    n.push(b);
                    b = y(b + a, f);
                    if (b === l) break;
                    var l = b
                }
                return n
            },
            getMinorTickInterval: function () {
                var a = this.options;
                return !0 === a.minorTicks ? z(a.minorTickInterval, "auto") : !1 === a.minorTicks ? null : a.minorTickInterval
            },
            getMinorTickPositions: function () {
                var a = this,
                    b = a.options,
                    e = a.tickPositions,
                    c = a.minorTickInterval,
                    f = [],
                    l = a.pointRangePadding || 0,
                    k = a.min - l;
                l = a.max + l;
                var t = l - k;
                if (t && t / c < a.len / 3)
                    if (a.isLog) this.paddedTicks.forEach(function (b,
                        e, n) {
                        e && f.push.apply(f, a.getLogTickPositions(c, n[e - 1], n[e], !0))
                    });
                    else if (a.isDatetimeAxis && "auto" === this.getMinorTickInterval()) f = f.concat(a.getTimeTicks(a.normalizeTimeTickInterval(c), k, l, b.startOfWeek));
                else
                    for (b = k + (e[0] - k) % c; b <= l && b !== f[0]; b += c) f.push(b);
                0 !== f.length && a.trimTicks(f);
                return f
            },
            adjustForMinRange: function () {
                var a = this.options,
                    b = this.min,
                    e = this.max,
                    c, f, l, k, t;
                this.isXAxis && "undefined" === typeof this.minRange && !this.isLog && (u(a.min) || u(a.max) ? this.minRange = null : (this.series.forEach(function (b) {
                    k =
                        b.xData;
                    for (f = t = b.xIncrement ? 1 : k.length - 1; 0 < f; f--)
                        if (l = k[f] - k[f - 1], "undefined" === typeof c || l < c) c = l
                }), this.minRange = Math.min(5 * c, this.dataMax - this.dataMin)));
                if (e - b < this.minRange) {
                    var p = this.dataMax - this.dataMin >= this.minRange;
                    var m = this.minRange;
                    var d = (m - e + b) / 2;
                    d = [b - d, z(a.min, b - d)];
                    p && (d[2] = this.isLog ? this.log2lin(this.dataMin) : this.dataMin);
                    b = A(d);
                    e = [b + m, z(a.max, b + m)];
                    p && (e[2] = this.isLog ? this.log2lin(this.dataMax) : this.dataMax);
                    e = F(e);
                    e - b < m && (d[0] = e - m, d[1] = z(a.min, e - m), b = A(d))
                }
                this.min = b;
                this.max =
                    e
            },
            getClosest: function () {
                var a;
                this.categories ? a = 1 : this.series.forEach(function (b) {
                    var e = b.closestPointRange,
                        c = b.visible || !b.chart.options.chart.ignoreHiddenSeries;
                    !b.noSharedTooltip && u(e) && c && (a = u(a) ? Math.min(a, e) : e)
                });
                return a
            },
            nameToX: function (a) {
                var b = c(this.categories),
                    e = b ? this.categories : this.names,
                    f = a.options.x;
                a.series.requireSorting = !1;
                u(f) || (f = !1 === this.options.uniqueNames ? a.series.autoIncrement() : b ? e.indexOf(a.name) : z(e.keys[a.name], -1));
                if (-1 === f) {
                    if (!b) var n = e.length
                } else n = f;
                "undefined" !==
                typeof n && (this.names[n] = a.name, this.names.keys[a.name] = n);
                return n
            },
            updateNames: function () {
                var a = this,
                    b = this.names;
                0 < b.length && (Object.keys(b.keys).forEach(function (a) {
                    delete b.keys[a]
                }), b.length = 0, this.minRange = this.userMinRange, (this.series || []).forEach(function (b) {
                    b.xIncrement = null;
                    if (!b.points || b.isDirtyData) a.max = Math.max(a.max, b.xData.length - 1), b.processData(), b.generatePoints();
                    b.data.forEach(function (e, c) {
                        if (e && e.options && "undefined" !== typeof e.name) {
                            var f = a.nameToX(e);
                            "undefined" !== typeof f &&
                                f !== e.x && (e.x = f, b.xData[c] = f)
                        }
                    })
                }))
            },
            setAxisTranslation: function (a) {
                var b = this,
                    c = b.max - b.min,
                    f = b.axisPointRange || 0,
                    n = 0,
                    l = 0,
                    k = b.linkedParent,
                    t = !!b.categories,
                    p = b.transA,
                    m = b.isXAxis;
                if (m || t || f) {
                    var d = b.getClosest();
                    k ? (n = k.minPointOffset, l = k.pointRangePadding) : b.series.forEach(function (a) {
                        var c = t ? 1 : m ? z(a.options.pointRange, d, 0) : b.axisPointRange || 0,
                            w = a.options.pointPlacement;
                        f = Math.max(f, c);
                        if (!b.single || t) a = a.is("xrange") ? !m : m, n = Math.max(n, a && e(w) ? 0 : c / 2), l = Math.max(l, a && "on" === w ? 0 : c)
                    });
                    k = b.ordinalSlope &&
                        d ? b.ordinalSlope / d : 1;
                    b.minPointOffset = n *= k;
                    b.pointRangePadding = l *= k;
                    b.pointRange = Math.min(f, b.single && t ? 1 : c);
                    m && (b.closestPointRange = d)
                }
                a && (b.oldTransA = p);
                b.translationSlope = b.transA = p = b.staticScale || b.len / (c + l || 1);
                b.transB = b.horiz ? b.left : b.bottom;
                b.minPixelPadding = p * n;
                q(this, "afterSetAxisTranslation")
            },
            minFromRange: function () {
                return this.max - this.range
            },
            setTickInterval: function (a) {
                var b = this,
                    e = b.chart,
                    c = b.options,
                    n = b.isLog,
                    k = b.isDatetimeAxis,
                    t = b.isXAxis,
                    d = b.isLinked,
                    p = c.maxPadding,
                    x = c.minPadding,
                    B = c.tickInterval,
                    H = c.tickPixelInterval,
                    G = b.categories,
                    V = m(b.threshold) ? b.threshold : null,
                    g = b.softThreshold;
                k || G || d || this.getTickAmount();
                var K = z(b.userMin, c.min);
                var I = z(b.userMax, c.max);
                if (d) {
                    b.linkedParent = e[b.coll][c.linkedTo];
                    var Q = b.linkedParent.getExtremes();
                    b.min = z(Q.min, Q.dataMin);
                    b.max = z(Q.max, Q.dataMax);
                    c.type !== b.linkedParent.options.type && h(11, 1, e)
                } else {
                    if (!g && u(V))
                        if (b.dataMin >= V) Q = V, x = 0;
                        else if (b.dataMax <= V) {
                        var v = V;
                        p = 0
                    }
                    b.min = z(K, Q, b.dataMin);
                    b.max = z(I, v, b.dataMax)
                }
                n && (b.positiveValuesOnly &&
                    !a && 0 >= Math.min(b.min, z(b.dataMin, b.min)) && h(10, 1, e), b.min = y(b.log2lin(b.min), 16), b.max = y(b.log2lin(b.max), 16));
                b.range && u(b.max) && (b.userMin = b.min = K = Math.max(b.dataMin, b.minFromRange()), b.userMax = I = b.max, b.range = null);
                q(b, "foundExtremes");
                b.beforePadding && b.beforePadding();
                b.adjustForMinRange();
                !(G || b.axisPointRange || b.usePercentage || d) && u(b.min) && u(b.max) && (e = b.max - b.min) && (!u(K) && x && (b.min -= e * x), !u(I) && p && (b.max += e * p));
                m(b.userMin) || (m(c.softMin) && c.softMin < b.min && (b.min = K = c.softMin), m(c.floor) &&
                    (b.min = Math.max(b.min, c.floor)));
                m(b.userMax) || (m(c.softMax) && c.softMax > b.max && (b.max = I = c.softMax), m(c.ceiling) && (b.max = Math.min(b.max, c.ceiling)));
                g && u(b.dataMin) && (V = V || 0, !u(K) && b.min < V && b.dataMin >= V ? b.min = b.options.minRange ? Math.min(V, b.max - b.minRange) : V : !u(I) && b.max > V && b.dataMax <= V && (b.max = b.options.minRange ? Math.max(V, b.min + b.minRange) : V));
                b.tickInterval = b.min === b.max || "undefined" === typeof b.min || "undefined" === typeof b.max ? 1 : d && !B && H === b.linkedParent.options.tickPixelInterval ? B = b.linkedParent.tickInterval :
                    z(B, this.tickAmount ? (b.max - b.min) / Math.max(this.tickAmount - 1, 1) : void 0, G ? 1 : (b.max - b.min) * H / Math.max(b.len, H));
                t && !a && b.series.forEach(function (a) {
                    a.processData(b.min !== b.oldMin || b.max !== b.oldMax)
                });
                b.setAxisTranslation(!0);
                b.beforeSetTickPositions && b.beforeSetTickPositions();
                b.postProcessTickInterval && (b.tickInterval = b.postProcessTickInterval(b.tickInterval));
                b.pointRange && !B && (b.tickInterval = Math.max(b.pointRange, b.tickInterval));
                a = z(c.minTickInterval, b.isDatetimeAxis && b.closestPointRange);
                !B && b.tickInterval <
                    a && (b.tickInterval = a);
                k || n || B || (b.tickInterval = l(b.tickInterval, null, f(b.tickInterval), z(c.allowDecimals, !(.5 < b.tickInterval && 5 > b.tickInterval && 1E3 < b.max && 9999 > b.max)), !!this.tickAmount));
                this.tickAmount || (b.tickInterval = b.unsquish());
                this.setTickPositions()
            },
            setTickPositions: function () {
                var a = this.options,
                    b = a.tickPositions;
                var e = this.getMinorTickInterval();
                var c = a.tickPositioner,
                    f = a.startOnTick,
                    l = a.endOnTick;
                this.tickmarkOffset = this.categories && "between" === a.tickmarkPlacement && 1 === this.tickInterval ?
                    .5 : 0;
                this.minorTickInterval = "auto" === e && this.tickInterval ? this.tickInterval / 5 : e;
                this.single = this.min === this.max && u(this.min) && !this.tickAmount && (parseInt(this.min, 10) === this.min || !1 !== a.allowDecimals);
                this.tickPositions = e = b && b.slice();
                !e && (!this.ordinalPositions && (this.max - this.min) / this.tickInterval > Math.max(2 * this.len, 200) ? (e = [this.min, this.max], h(19, !1, this.chart)) : e = this.isDatetimeAxis ? this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval, a.units), this.min, this.max, a.startOfWeek,
                    this.ordinalPositions, this.closestPointRange, !0) : this.isLog ? this.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min, this.max), e.length > this.len && (e = [e[0], e.pop()], e[0] === e[1] && (e.length = 1)), this.tickPositions = e, c && (c = c.apply(this, [this.min, this.max]))) && (this.tickPositions = e = c);
                this.paddedTicks = e.slice(0);
                this.trimTicks(e, f, l);
                this.isLinked || (this.single && 2 > e.length && !this.categories && !this.series.some(function (b) {
                    return b.is("heatmap") &&
                        "between" === b.options.pointPlacement
                }) && (this.min -= .5, this.max += .5), b || c || this.adjustTickAmount());
                q(this, "afterSetTickPositions")
            },
            trimTicks: function (a, b, e) {
                var c = a[0],
                    f = a[a.length - 1],
                    n = !this.isOrdinal && this.minPointOffset || 0;
                q(this, "trimTicks");
                if (!this.isLinked) {
                    if (b && -Infinity !== c) this.min = c;
                    else
                        for (; this.min - n > a[0];) a.shift();
                    if (e) this.max = f;
                    else
                        for (; this.max + n < a[a.length - 1];) a.pop();
                    0 === a.length && u(c) && !this.options.tickPositions && a.push((f + c) / 2)
                }
            },
            alignToOthers: function () {
                var a = {},
                    b, e = this.options;
                !1 === this.chart.options.chart.alignTicks || !1 === e.alignTicks || !1 === e.startOnTick || !1 === e.endOnTick || this.isLog || this.chart[this.coll].forEach(function (e) {
                    var c = e.options;
                    c = [e.horiz ? c.left : c.top, c.width, c.height, c.pane].join();
                    e.series.length && (a[c] ? b = !0 : a[c] = 1)
                });
                return b
            },
            getTickAmount: function () {
                var a = this.options,
                    b = a.tickAmount,
                    e = a.tickPixelInterval;
                !u(a.tickInterval) && this.len < e && !this.isRadial && !this.isLog && a.startOnTick && a.endOnTick && (b = 2);
                !b && this.alignToOthers() && (b = Math.ceil(this.len / e) + 1);
                4 > b && (this.finalTickAmt = b, b = 5);
                this.tickAmount = b
            },
            adjustTickAmount: function () {
                var a = this.options,
                    b = this.tickInterval,
                    e = this.tickPositions,
                    c = this.tickAmount,
                    f = this.finalTickAmt,
                    l = e && e.length,
                    k = z(this.threshold, this.softThreshold ? 0 : null),
                    t;
                if (this.hasData()) {
                    if (l < c) {
                        for (t = this.min; e.length < c;) e.length % 2 || t === k ? e.push(y(e[e.length - 1] + b)) : e.unshift(y(e[0] - b));
                        this.transA *= (l - 1) / (c - 1);
                        this.min = a.startOnTick ? e[0] : Math.min(this.min, e[0]);
                        this.max = a.endOnTick ? e[e.length - 1] : Math.max(this.max, e[e.length - 1])
                    } else l >
                        c && (this.tickInterval *= 2, this.setTickPositions());
                    if (u(f)) {
                        for (b = a = e.length; b--;)(3 === f && 1 === b % 2 || 2 >= f && 0 < b && b < a - 1) && e.splice(b, 1);
                        this.finalTickAmt = void 0
                    }
                }
            },
            setScale: function () {
                var a = this.series.some(function (b) {
                        return b.isDirtyData || b.isDirty || b.xAxis && b.xAxis.isDirty
                    }),
                    b;
                this.oldMin = this.min;
                this.oldMax = this.max;
                this.oldAxisLength = this.len;
                this.setAxisSize();
                (b = this.len !== this.oldAxisLength) || a || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax || this.alignToOthers() ?
                    (this.resetStacks && this.resetStacks(), this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickInterval(), this.oldUserMin = this.userMin, this.oldUserMax = this.userMax, this.isDirty || (this.isDirty = b || this.min !== this.oldMin || this.max !== this.oldMax)) : this.cleanStacks && this.cleanStacks();
                q(this, "afterSetScale")
            },
            setExtremes: function (a, b, e, c, f) {
                var n = this,
                    l = n.chart;
                e = z(e, !0);
                n.series.forEach(function (b) {
                    delete b.kdTree
                });
                f = N(f, {
                    min: a,
                    max: b
                });
                q(n, "setExtremes", f, function () {
                    n.userMin = a;
                    n.userMax = b;
                    n.eventArgs =
                        f;
                    e && l.redraw(c)
                })
            },
            zoom: function (a, b) {
                var e = this.dataMin,
                    c = this.dataMax,
                    f = this.options,
                    n = Math.min(e, z(f.min, e)),
                    l = Math.max(c, z(f.max, c));
                a = {
                    newMin: a,
                    newMax: b
                };
                q(this, "zoom", a, function (b) {
                    var a = b.newMin,
                        f = b.newMax;
                    if (a !== this.min || f !== this.max) this.allowZoomOutside || (u(e) && (a < n && (a = n), a > l && (a = l)), u(c) && (f < n && (f = n), f > l && (f = l))), this.displayBtn = "undefined" !== typeof a || "undefined" !== typeof f, this.setExtremes(a, f, !1, void 0, {
                        trigger: "zoom"
                    });
                    b.zoomed = !0
                });
                return a.zoomed
            },
            setAxisSize: function () {
                var a =
                    this.chart,
                    b = this.options,
                    e = b.offsets || [0, 0, 0, 0],
                    c = this.horiz,
                    f = this.width = Math.round(x(z(b.width, a.plotWidth - e[3] + e[1]), a.plotWidth)),
                    l = this.height = Math.round(x(z(b.height, a.plotHeight - e[0] + e[2]), a.plotHeight)),
                    k = this.top = Math.round(x(z(b.top, a.plotTop + e[0]), a.plotHeight, a.plotTop));
                b = this.left = Math.round(x(z(b.left, a.plotLeft + e[3]), a.plotWidth, a.plotLeft));
                this.bottom = a.chartHeight - l - k;
                this.right = a.chartWidth - f - b;
                this.len = Math.max(c ? f : l, 0);
                this.pos = c ? b : k
            },
            getExtremes: function () {
                var a = this.isLog;
                return {
                    min: a ? y(this.lin2log(this.min)) : this.min,
                    max: a ? y(this.lin2log(this.max)) : this.max,
                    dataMin: this.dataMin,
                    dataMax: this.dataMax,
                    userMin: this.userMin,
                    userMax: this.userMax
                }
            },
            getThreshold: function (a) {
                var b = this.isLog,
                    e = b ? this.lin2log(this.min) : this.min;
                b = b ? this.lin2log(this.max) : this.max;
                null === a || -Infinity === a ? a = e : Infinity === a ? a = b : e > a ? a = e : b < a && (a = b);
                return this.translate(a, 0, 1, 0, 1)
            },
            autoLabelAlign: function (a) {
                var b = (z(a, 0) - 90 * this.side + 720) % 360;
                a = {
                    align: "center"
                };
                q(this, "autoLabelAlign", a, function (a) {
                    15 <
                        b && 165 > b ? a.align = "right" : 195 < b && 345 > b && (a.align = "left")
                });
                return a.align
            },
            tickSize: function (a) {
                var b = this.options,
                    e = b[a + "Length"],
                    c = z(b[a + "Width"], "tick" === a && this.isXAxis && !this.categories ? 1 : 0);
                if (c && e) {
                    "inside" === b[a + "Position"] && (e = -e);
                    var f = [e, c]
                }
                a = {
                    tickSize: f
                };
                q(this, "afterTickSize", a);
                return a.tickSize
            },
            labelMetrics: function () {
                var a = this.tickPositions && this.tickPositions[0] || 0;
                return this.chart.renderer.fontMetrics(this.options.labels.style && this.options.labels.style.fontSize, this.ticks[a] &&
                    this.ticks[a].label)
            },
            unsquish: function () {
                var a = this.options.labels,
                    b = this.horiz,
                    e = this.tickInterval,
                    c = e,
                    f = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / e),
                    l, k = a.rotation,
                    t = this.labelMetrics(),
                    p, d = Number.MAX_VALUE,
                    m, x = this.max - this.min,
                    G = function (b) {
                        var a = b / (f || 1);
                        a = 1 < a ? Math.ceil(a) : 1;
                        a * e > x && Infinity !== b && Infinity !== f && x && (a = Math.ceil(x / e));
                        return y(a * e)
                    };
                b ? (m = !a.staggerLines && !a.step && (u(k) ? [k] : f < z(a.autoRotationLimit, 80) && a.autoRotation)) && m.forEach(function (b) {
                    if (b === k || b && -90 <= b && 90 >= b) {
                        p =
                            G(Math.abs(t.h / Math.sin(K * b)));
                        var a = p + Math.abs(b / 360);
                        a < d && (d = a, l = b, c = p)
                    }
                }) : a.step || (c = G(t.h));
                this.autoRotation = m;
                this.labelRotation = z(l, k);
                return c
            },
            getSlotWidth: function (a) {
                var b = this.chart,
                    e = this.horiz,
                    c = this.options.labels,
                    f = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1),
                    l = b.margin[3];
                return a && a.slotWidth || e && 2 > (c.step || 0) && !c.rotation && (this.staggerLines || 1) * this.len / f || !e && (c.style && parseInt(c.style.width, 10) || l && l - b.spacing[3] || .33 * b.chartWidth)
            },
            renderUnsquish: function () {
                var a =
                    this.chart,
                    b = a.renderer,
                    c = this.tickPositions,
                    f = this.ticks,
                    l = this.options.labels,
                    k = l && l.style || {},
                    t = this.horiz,
                    d = this.getSlotWidth(),
                    p = Math.max(1, Math.round(d - 2 * (l.padding || 5))),
                    m = {},
                    x = this.labelMetrics(),
                    z = l.style && l.style.textOverflow,
                    G = 0;
                e(l.rotation) || (m.rotation = l.rotation || 0);
                c.forEach(function (b) {
                    b = f[b];
                    b.movedLabel && b.replaceMovedLabel();
                    b && b.label && b.label.textPxLength > G && (G = b.label.textPxLength)
                });
                this.maxLabelLength = G;
                if (this.autoRotation) G > p && G > x.h ? m.rotation = this.labelRotation : this.labelRotation =
                    0;
                else if (d) {
                    var h = p;
                    if (!z) {
                        var q = "clip";
                        for (p = c.length; !t && p--;) {
                            var B = c[p];
                            if (B = f[B].label) B.styles && "ellipsis" === B.styles.textOverflow ? B.css({
                                textOverflow: "clip"
                            }) : B.textPxLength > d && B.css({
                                width: d + "px"
                            }), B.getBBox().height > this.len / c.length - (x.h - x.f) && (B.specificTextOverflow = "ellipsis")
                        }
                    }
                }
                m.rotation && (h = G > .5 * a.chartHeight ? .33 * a.chartHeight : G, z || (q = "ellipsis"));
                if (this.labelAlign = l.align || this.autoLabelAlign(this.labelRotation)) m.align = this.labelAlign;
                c.forEach(function (b) {
                    var a = (b = f[b]) && b.label,
                        e = k.width,
                        c = {};
                    a && (a.attr(m), b.shortenLabel ? b.shortenLabel() : h && !e && "nowrap" !== k.whiteSpace && (h < a.textPxLength || "SPAN" === a.element.tagName) ? (c.width = h, z || (c.textOverflow = a.specificTextOverflow || q), a.css(c)) : a.styles && a.styles.width && !c.width && !e && a.css({
                        width: null
                    }), delete a.specificTextOverflow, b.rotation = m.rotation)
                }, this);
                this.tickRotCorr = b.rotCorr(x.b, this.labelRotation || 0, 0 !== this.side)
            },
            hasData: function () {
                return this.series.some(function (a) {
                        return a.hasData()
                    }) || this.options.showEmpty && u(this.min) &&
                    u(this.max)
            },
            addTitle: function (e) {
                var b = this.chart.renderer,
                    c = this.horiz,
                    f = this.opposite,
                    l = this.options.title,
                    n, k = this.chart.styledMode;
                this.axisTitle || ((n = l.textAlign) || (n = (c ? {
                    low: "left",
                    middle: "center",
                    high: "right"
                } : {
                    low: f ? "right" : "left",
                    middle: "center",
                    high: f ? "left" : "right"
                })[l.align]), this.axisTitle = b.text(l.text, 0, 0, l.useHTML).attr({
                    zIndex: 7,
                    rotation: l.rotation || 0,
                    align: n
                }).addClass("highcharts-axis-title"), k || this.axisTitle.css(a(l.style)), this.axisTitle.add(this.axisGroup), this.axisTitle.isNew = !0);
                k || l.style.width || this.isRadial || this.axisTitle.css({
                    width: this.len
                });
                this.axisTitle[e ? "show" : "hide"](e)
            },
            generateTick: function (a) {
                var b = this.ticks;
                b[a] ? b[a].addLabel() : b[a] = new r(this, a)
            },
            getOffset: function () {
                var a = this,
                    b = a.chart,
                    e = b.renderer,
                    c = a.options,
                    f = a.tickPositions,
                    l = a.ticks,
                    k = a.horiz,
                    m = a.side,
                    p = b.inverted && !a.isZAxis ? [1, 0, 3, 2][m] : m,
                    d, x = 0,
                    h = 0,
                    G = c.title,
                    B = c.labels,
                    H = 0,
                    g = b.axisOffset;
                b = b.clipOffset;
                var K = [-1, 1, 1, -1][m],
                    I = c.className,
                    Q = a.axisParent;
                var y = a.hasData();
                a.showAxis = d = y || z(c.showEmpty,
                    !0);
                a.staggerLines = a.horiz && B.staggerLines;
                a.axisGroup || (a.gridGroup = e.g("grid").attr({
                    zIndex: c.gridZIndex || 1
                }).addClass("highcharts-" + this.coll.toLowerCase() + "-grid " + (I || "")).add(Q), a.axisGroup = e.g("axis").attr({
                    zIndex: c.zIndex || 2
                }).addClass("highcharts-" + this.coll.toLowerCase() + " " + (I || "")).add(Q), a.labelGroup = e.g("axis-labels").attr({
                    zIndex: B.zIndex || 7
                }).addClass("highcharts-" + a.coll.toLowerCase() + "-labels " + (I || "")).add(Q));
                y || a.isLinked ? (f.forEach(function (b, e) {
                        a.generateTick(b, e)
                    }), a.renderUnsquish(),
                    a.reserveSpaceDefault = 0 === m || 2 === m || {
                        1: "left",
                        3: "right"
                    } [m] === a.labelAlign, z(B.reserveSpace, "center" === a.labelAlign ? !0 : null, a.reserveSpaceDefault) && f.forEach(function (b) {
                        H = Math.max(l[b].getLabelSize(), H)
                    }), a.staggerLines && (H *= a.staggerLines), a.labelOffset = H * (a.opposite ? -1 : 1)) : t(l, function (b, a) {
                    b.destroy();
                    delete l[a]
                });
                if (G && G.text && !1 !== G.enabled && (a.addTitle(d), d && !1 !== G.reserveSpace)) {
                    a.titleOffset = x = a.axisTitle.getBBox()[k ? "height" : "width"];
                    var v = G.offset;
                    h = u(v) ? 0 : z(G.margin, k ? 5 : 10)
                }
                a.renderLine();
                a.offset = K * z(c.offset, g[m] ? g[m] + (c.margin || 0) : 0);
                a.tickRotCorr = a.tickRotCorr || {
                    x: 0,
                    y: 0
                };
                e = 0 === m ? -a.labelMetrics().h : 2 === m ? a.tickRotCorr.y : 0;
                h = Math.abs(H) + h;
                H && (h = h - e + K * (k ? z(B.y, a.tickRotCorr.y + 8 * K) : B.x));
                a.axisTitleMargin = z(v, h);
                a.getMaxLabelDimensions && (a.maxLabelDimensions = a.getMaxLabelDimensions(l, f));
                k = this.tickSize("tick");
                g[m] = Math.max(g[m], a.axisTitleMargin + x + K * a.offset, h, f && f.length && k ? k[0] + K * a.offset : 0);
                c = c.offset ? 0 : 2 * Math.floor(a.axisLine.strokeWidth() / 2);
                b[p] = Math.max(b[p], c);
                q(this, "afterGetOffset")
            },
            getLinePath: function (a) {
                var b = this.chart,
                    e = this.opposite,
                    c = this.offset,
                    f = this.horiz,
                    l = this.left + (e ? this.width : 0) + c;
                c = b.chartHeight - this.bottom - (e ? this.height : 0) + c;
                e && (a *= -1);
                return b.renderer.crispLine(["M", f ? this.left : l, f ? c : this.top, "L", f ? b.chartWidth - this.right : l, f ? c : b.chartHeight - this.bottom], a)
            },
            renderLine: function () {
                this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup), this.chart.styledMode || this.axisLine.attr({
                    stroke: this.options.lineColor,
                    "stroke-width": this.options.lineWidth,
                    zIndex: 7
                }))
            },
            getTitlePosition: function () {
                var a = this.horiz,
                    b = this.left,
                    e = this.top,
                    c = this.len,
                    f = this.options.title,
                    l = a ? b : e,
                    k = this.opposite,
                    t = this.offset,
                    m = f.x || 0,
                    d = f.y || 0,
                    x = this.axisTitle,
                    h = this.chart.renderer.fontMetrics(f.style && f.style.fontSize, x);
                x = Math.max(x.getBBox(null, 0).height - h.h - 1, 0);
                c = {
                    low: l + (a ? 0 : c),
                    middle: l + c / 2,
                    high: l + (a ? c : 0)
                } [f.align];
                b = (a ? e + this.height : b) + (a ? 1 : -1) * (k ? -1 : 1) * this.axisTitleMargin + [-x, x, h.f, -x][this.side];
                a = {
                    x: a ? c + m : b + (k ? this.width : 0) +
                        t + m,
                    y: a ? b + d - (k ? this.height : 0) + t : c + d
                };
                q(this, "afterGetTitlePosition", {
                    titlePosition: a
                });
                return a
            },
            renderMinorTick: function (a) {
                var b = this.chart.hasRendered && m(this.oldMin),
                    e = this.minorTicks;
                e[a] || (e[a] = new r(this, a, "minor"));
                b && e[a].isNew && e[a].render(null, !0);
                e[a].render(null, !1, 1)
            },
            renderTick: function (a, b) {
                var e = this.isLinked,
                    c = this.ticks,
                    f = this.chart.hasRendered && m(this.oldMin);
                if (!e || a >= this.min && a <= this.max) c[a] || (c[a] = new r(this, a)), f && c[a].isNew && c[a].render(b, !0, -1), c[a].render(b)
            },
            render: function () {
                var a =
                    this,
                    b = a.chart,
                    e = a.options,
                    c = a.isLog,
                    f = a.isLinked,
                    l = a.tickPositions,
                    k = a.axisTitle,
                    x = a.ticks,
                    p = a.minorTicks,
                    h = a.alternateBands,
                    z = e.stackLabels,
                    B = e.alternateGridColor,
                    G = a.tickmarkOffset,
                    H = a.axisLine,
                    u = a.showAxis,
                    g = E(b.renderer.globalAnimation),
                    K, I;
                a.labelEdge.length = 0;
                a.overlap = !1;
                [x, p, h].forEach(function (b) {
                    t(b, function (b) {
                        b.isActive = !1
                    })
                });
                if (a.hasData() || f) a.minorTickInterval && !a.categories && a.getMinorTickPositions().forEach(function (b) {
                    a.renderMinorTick(b)
                }), l.length && (l.forEach(function (b, e) {
                    a.renderTick(b,
                        e)
                }), G && (0 === a.min || a.single) && (x[-1] || (x[-1] = new r(a, -1, null, !0)), x[-1].render(-1))), B && l.forEach(function (e, f) {
                    I = "undefined" !== typeof l[f + 1] ? l[f + 1] + G : a.max - G;
                    0 === f % 2 && e < a.max && I <= a.max + (b.polar ? -G : G) && (h[e] || (h[e] = new d.PlotLineOrBand(a)), K = e + G, h[e].options = {
                        from: c ? a.lin2log(K) : K,
                        to: c ? a.lin2log(I) : I,
                        color: B
                    }, h[e].render(), h[e].isActive = !0)
                }), a._addedPlotLB || ((e.plotLines || []).concat(e.plotBands || []).forEach(function (b) {
                    a.addPlotBandOrLine(b)
                }), a._addedPlotLB = !0);
                [x, p, h].forEach(function (a) {
                    var e,
                        c = [],
                        f = g.duration;
                    t(a, function (b, a) {
                        b.isActive || (b.render(a, !1, 0), b.isActive = !1, c.push(a))
                    });
                    Q(function () {
                        for (e = c.length; e--;) a[c[e]] && !a[c[e]].isActive && (a[c[e]].destroy(), delete a[c[e]])
                    }, a !== h && b.hasRendered && f ? f : 0)
                });
                H && (H[H.isPlaced ? "animate" : "attr"]({
                    d: this.getLinePath(H.strokeWidth())
                }), H.isPlaced = !0, H[u ? "show" : "hide"](u));
                k && u && (e = a.getTitlePosition(), m(e.y) ? (k[k.isNew ? "attr" : "animate"](e), k.isNew = !1) : (k.attr("y", -9999), k.isNew = !0));
                z && z.enabled && a.renderStackTotals();
                a.isDirty = !1;
                q(this,
                    "afterRender")
            },
            redraw: function () {
                this.visible && (this.render(), this.plotLinesAndBands.forEach(function (a) {
                    a.render()
                }));
                this.series.forEach(function (a) {
                    a.isDirty = !0
                })
            },
            keepProps: "extKey hcEvents names series userMax userMin".split(" "),
            destroy: function (a) {
                var b = this,
                    e = b.stacks,
                    c = b.plotLinesAndBands,
                    f;
                q(this, "destroy", {
                    keepEvents: a
                });
                a || B(b);
                t(e, function (b, a) {
                    D(b);
                    e[a] = null
                });
                [b.ticks, b.minorTicks, b.alternateBands].forEach(function (b) {
                    D(b)
                });
                if (c)
                    for (a = c.length; a--;) c[a].destroy();
                "stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross scrollbar".split(" ").forEach(function (a) {
                    b[a] &&
                        (b[a] = b[a].destroy())
                });
                for (f in b.plotLinesAndBandsGroups) b.plotLinesAndBandsGroups[f] = b.plotLinesAndBandsGroups[f].destroy();
                t(b, function (a, e) {
                    -1 === b.keepProps.indexOf(e) && delete b[e]
                })
            },
            drawCrosshair: function (a, b) {
                var e = this.crosshair,
                    c = z(e.snap, !0),
                    f, l = this.cross,
                    k = this.chart;
                q(this, "drawCrosshair", {
                    e: a,
                    point: b
                });
                a || (a = this.cross && this.cross.e);
                if (this.crosshair && !1 !== (u(b) || !c)) {
                    c ? u(b) && (f = z("colorAxis" !== this.coll ? b.crosshairPos : null, this.isXAxis ? b.plotX : this.len - b.plotY)) : f = a && (this.horiz ?
                        a.chartX - this.pos : this.len - a.chartY + this.pos);
                    if (u(f)) {
                        var t = {
                            value: b && (this.isXAxis ? b.x : z(b.stackY, b.y)),
                            translatedValue: f
                        };
                        k.polar && N(t, {
                            isCrosshair: !0,
                            chartX: a && a.chartX,
                            chartY: a && a.chartY,
                            point: b
                        });
                        t = this.getPlotLinePath(t) || null
                    }
                    if (!u(t)) {
                        this.hideCrosshair();
                        return
                    }
                    c = this.categories && !this.isRadial;
                    l || (this.cross = l = k.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" + (c ? "category " : "thin ") + e.className).attr({
                        zIndex: z(e.zIndex, 2)
                    }).add(), k.styledMode || (l.attr({
                        stroke: e.color ||
                            (c ? J("#ccd6eb").setOpacity(.25).get() : "#cccccc"),
                        "stroke-width": z(e.width, 1)
                    }).css({
                        "pointer-events": "none"
                    }), e.dashStyle && l.attr({
                        dashstyle: e.dashStyle
                    })));
                    l.show().attr({
                        d: t
                    });
                    c && !e.width && l.attr({
                        "stroke-width": this.transA
                    });
                    this.cross.e = a
                } else this.hideCrosshair();
                q(this, "afterDrawCrosshair", {
                    e: a,
                    point: b
                })
            },
            hideCrosshair: function () {
                this.cross && this.cross.hide();
                q(this, "afterHideCrosshair")
            }
        });
        return d.Axis = g
    });
    S(r, "parts/DateTimeAxis.js", [r["parts/Globals.js"], r["parts/Utilities.js"]], function (d,
        g) {
        var r = g.getMagnitude,
            v = g.normalizeTickInterval,
            J = g.timeUnits;
        d = d.Axis;
        d.prototype.getTimeTicks = function () {
            return this.chart.time.getTimeTicks.apply(this.chart.time, arguments)
        };
        d.prototype.normalizeTimeTickInterval = function (d, g) {
            var A = g || [
                ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
                ["second", [1, 2, 5, 10, 15, 30]],
                ["minute", [1, 2, 5, 10, 15, 30]],
                ["hour", [1, 2, 3, 4, 6, 8, 12]],
                ["day", [1, 2]],
                ["week", [1, 2]],
                ["month", [1, 2, 3, 4, 6]],
                ["year", null]
            ];
            g = A[A.length - 1];
            var F = J[g[0]],
                E = g[1],
                y;
            for (y = 0; y < A.length && !(g = A[y],
                    F = J[g[0]], E = g[1], A[y + 1] && d <= (F * E[E.length - 1] + J[A[y + 1][0]]) / 2); y++);
            F === J.year && d < 5 * F && (E = [1, 2, 5]);
            d = v(d / F, E, "year" === g[0] ? Math.max(r(d / F), 1) : 1);
            return {
                unitRange: F,
                count: d,
                unitName: g[0]
            }
        }
    });
    S(r, "parts/LogarithmicAxis.js", [r["parts/Globals.js"], r["parts/Utilities.js"]], function (d, g) {
        var r = g.getMagnitude,
            v = g.normalizeTickInterval,
            J = g.pick;
        d = d.Axis;
        d.prototype.getLogTickPositions = function (d, g, A, F) {
            var E = this.options,
                y = this.len,
                u = [];
            F || (this._minorAutoInterval = null);
            if (.5 <= d) d = Math.round(d), u = this.getLinearTickPositions(d,
                g, A);
            else if (.08 <= d) {
                y = Math.floor(g);
                var D, h;
                for (E = .3 < d ? [1, 2, 4] : .15 < d ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; y < A + 1 && !h; y++) {
                    var N = E.length;
                    for (D = 0; D < N && !h; D++) {
                        var q = this.log2lin(this.lin2log(y) * E[D]);
                        q > g && (!F || P <= A) && "undefined" !== typeof P && u.push(P);
                        P > A && (h = !0);
                        var P = q
                    }
                }
            } else g = this.lin2log(g), A = this.lin2log(A), d = F ? this.getMinorTickInterval() : E.tickInterval, d = J("auto" === d ? null : d, this._minorAutoInterval, E.tickPixelInterval / (F ? 5 : 1) * (A - g) / ((F ? y / this.tickPositions.length : y) || 1)), d = v(d, null, r(d)), u = this.getLinearTickPositions(d,
                g, A).map(this.log2lin), F || (this._minorAutoInterval = d / 5);
            F || (this.tickInterval = d);
            return u
        };
        d.prototype.log2lin = function (d) {
            return Math.log(d) / Math.LN10
        };
        d.prototype.lin2log = function (d) {
            return Math.pow(10, d)
        }
    });
    S(r, "parts/PlotLineOrBand.js", [r["parts/Globals.js"], r["parts/Axis.js"], r["parts/Utilities.js"]], function (d, g, r) {
        var v = r.arrayMax,
            J = r.arrayMin,
            M = r.defined,
            E = r.destroyObjectProperties,
            A = r.erase,
            F = r.extend,
            L = r.merge,
            y = r.objectEach,
            u = r.pick,
            D = function () {
                function h(d, h) {
                    this.axis = d;
                    h && (this.options =
                        h, this.id = h.id)
                }
                h.prototype.render = function () {
                    d.fireEvent(this, "render");
                    var h = this,
                        q = h.axis,
                        g = q.horiz,
                        f = h.options,
                        c = f.label,
                        k = h.label,
                        m = f.to,
                        e = f.from,
                        a = f.value,
                        l = M(e) && M(m),
                        t = M(a),
                        z = h.svgElem,
                        x = !z,
                        B = [],
                        H = f.color,
                        Q = u(f.zIndex, 0),
                        I = f.events;
                    B = {
                        "class": "highcharts-plot-" + (l ? "band " : "line ") + (f.className || "")
                    };
                    var K = {},
                        n = q.chart.renderer,
                        b = l ? "bands" : "lines";
                    q.isLog && (e = q.log2lin(e), m = q.log2lin(m), a = q.log2lin(a));
                    q.chart.styledMode || (t ? (B.stroke = H || "#999999", B["stroke-width"] = u(f.width, 1), f.dashStyle &&
                        (B.dashstyle = f.dashStyle)) : l && (B.fill = H || "#e6ebf5", f.borderWidth && (B.stroke = f.borderColor, B["stroke-width"] = f.borderWidth)));
                    K.zIndex = Q;
                    b += "-" + Q;
                    (H = q.plotLinesAndBandsGroups[b]) || (q.plotLinesAndBandsGroups[b] = H = n.g("plot-" + b).attr(K).add());
                    x && (h.svgElem = z = n.path().attr(B).add(H));
                    if (t) B = q.getPlotLinePath({
                        value: a,
                        lineWidth: z.strokeWidth(),
                        acrossPanes: f.acrossPanes
                    });
                    else if (l) B = q.getPlotBandPath(e, m, f);
                    else return;
                    (x || !z.d) && B && B.length ? (z.attr({
                        d: B
                    }), I && y(I, function (b, a) {
                        z.on(a, function (b) {
                            I[a].apply(h,
                                [b])
                        })
                    })) : z && (B ? (z.show(!0), z.animate({
                        d: B
                    })) : z.d && (z.hide(), k && (h.label = k = k.destroy())));
                    c && (M(c.text) || M(c.formatter)) && B && B.length && 0 < q.width && 0 < q.height && !B.isFlat ? (c = L({
                        align: g && l && "center",
                        x: g ? !l && 4 : 10,
                        verticalAlign: !g && l && "middle",
                        y: g ? l ? 16 : 10 : l ? 6 : -4,
                        rotation: g && !l && 90
                    }, c), this.renderLabel(c, B, l, Q)) : k && k.hide();
                    return h
                };
                h.prototype.renderLabel = function (d, h, g, f) {
                    var c = this.label,
                        k = this.axis.chart.renderer;
                    c || (c = {
                        align: d.textAlign || d.align,
                        rotation: d.rotation,
                        "class": "highcharts-plot-" + (g ? "band" :
                            "line") + "-label " + (d.className || "")
                    }, c.zIndex = f, f = this.getLabelText(d), this.label = c = k.text(f, 0, 0, d.useHTML).attr(c).add(), this.axis.chart.styledMode || c.css(d.style));
                    k = h.xBounds || [h[1], h[4], g ? h[6] : h[1]];
                    h = h.yBounds || [h[2], h[5], g ? h[7] : h[2]];
                    g = J(k);
                    f = J(h);
                    c.align(d, !1, {
                        x: g,
                        y: f,
                        width: v(k) - g,
                        height: v(h) - f
                    });
                    c.show(!0)
                };
                h.prototype.getLabelText = function (d) {
                    return M(d.formatter) ? d.formatter.call(this) : d.text
                };
                h.prototype.destroy = function () {
                    A(this.axis.plotLinesAndBands, this);
                    delete this.axis;
                    E(this)
                };
                return h
            }();
        F(g.prototype, {
            getPlotBandPath: function (d, g) {
                var h = this.getPlotLinePath({
                        value: g,
                        force: !0,
                        acrossPanes: this.options.acrossPanes
                    }),
                    u = this.getPlotLinePath({
                        value: d,
                        force: !0,
                        acrossPanes: this.options.acrossPanes
                    }),
                    f = [],
                    c = this.horiz,
                    k = 1;
                d = d < this.min && g < this.min || d > this.max && g > this.max;
                if (u && h) {
                    if (d) {
                        var m = u.toString() === h.toString();
                        k = 0
                    }
                    for (d = 0; d < u.length; d += 6) c && h[d + 1] === u[d + 1] ? (h[d + 1] += k, h[d + 4] += k) : c || h[d + 2] !== u[d + 2] || (h[d + 2] += k, h[d + 5] += k), f.push("M", u[d + 1], u[d + 2], "L", u[d + 4], u[d + 5], h[d + 4], h[d + 5], h[d +
                        1], h[d + 2], "z"), f.isFlat = m
                }
                return f
            },
            addPlotBand: function (d) {
                return this.addPlotBandOrLine(d, "plotBands")
            },
            addPlotLine: function (d) {
                return this.addPlotBandOrLine(d, "plotLines")
            },
            addPlotBandOrLine: function (d, g) {
                var h = (new D(this, d)).render(),
                    u = this.userOptions;
                if (h) {
                    if (g) {
                        var f = u[g] || [];
                        f.push(d);
                        u[g] = f
                    }
                    this.plotLinesAndBands.push(h)
                }
                return h
            },
            removePlotBandOrLine: function (d) {
                for (var h = this.plotLinesAndBands, q = this.options, g = this.userOptions, f = h.length; f--;) h[f].id === d && h[f].destroy();
                [q.plotLines || [], g.plotLines || [], q.plotBands || [], g.plotBands || []].forEach(function (c) {
                    for (f = c.length; f--;) c[f].id === d && A(c, c[f])
                })
            },
            removePlotBand: function (d) {
                this.removePlotBandOrLine(d)
            },
            removePlotLine: function (d) {
                this.removePlotBandOrLine(d)
            }
        });
        d.PlotLineOrBand = D;
        return d.PlotLineOrBand
    });
    S(r, "parts/Tooltip.js", [r["parts/Globals.js"], r["parts/Utilities.js"]], function (d, g) {
        var r = g.clamp,
            v = g.css,
            J = g.defined,
            M = g.discardElement,
            E = g.extend,
            A = g.format,
            F = g.isNumber,
            L = g.isString,
            y = g.merge,
            u = g.pick,
            D = g.splat,
            h = g.syncTimeout,
            N = g.timeUnits;
        "";
        var q = d.doc,
            P = function () {
                function f(c, f) {
                    this.chart = void 0;
                    this.crosshairs = [];
                    this.distance = 0;
                    this.isHidden = !0;
                    this.isSticky = !1;
                    this.now = {};
                    this.options = {};
                    this.outside = !1;
                    this.init(c, f)
                }
                f.prototype.applyFilter = function () {
                    var c = this.chart;
                    c.renderer.definition({
                        tagName: "filter",
                        id: "drop-shadow-" + c.index,
                        opacity: .5,
                        children: [{
                            tagName: "feGaussianBlur",
                            "in": "SourceAlpha",
                            stdDeviation: 1
                        }, {
                            tagName: "feOffset",
                            dx: 1,
                            dy: 1
                        }, {
                            tagName: "feComponentTransfer",
                            children: [{
                                tagName: "feFuncA",
                                type: "linear",
                                slope: .3
                            }]
                        }, {
                            tagName: "feMerge",
                            children: [{
                                tagName: "feMergeNode"
                            }, {
                                tagName: "feMergeNode",
                                "in": "SourceGraphic"
                            }]
                        }]
                    });
                    c.renderer.definition({
                        tagName: "style",
                        textContent: ".highcharts-tooltip-" + c.index + "{filter:url(#drop-shadow-" + c.index + ")}"
                    })
                };
                f.prototype.bodyFormatter = function (c) {
                    return c.map(function (c) {
                        var f = c.series.tooltipOptions;
                        return (f[(c.point.formatPrefix || "point") + "Formatter"] || c.point.tooltipFormatter).call(c.point, f[(c.point.formatPrefix || "point") + "Format"] || "")
                    })
                };
                f.prototype.cleanSplit =
                    function (c) {
                        this.chart.series.forEach(function (f) {
                            var d = f && f.tt;
                            d && (!d.isActive || c ? f.tt = d.destroy() : d.isActive = !1)
                        })
                    };
                f.prototype.defaultFormatter = function (c) {
                    var f = this.points || D(this);
                    var d = [c.tooltipFooterHeaderFormatter(f[0])];
                    d = d.concat(c.bodyFormatter(f));
                    d.push(c.tooltipFooterHeaderFormatter(f[0], !0));
                    return d
                };
                f.prototype.destroy = function () {
                    this.label && (this.label = this.label.destroy());
                    this.split && this.tt && (this.cleanSplit(this.chart, !0), this.tt = this.tt.destroy());
                    this.renderer && (this.renderer =
                        this.renderer.destroy(), M(this.container));
                    g.clearTimeout(this.hideTimer);
                    g.clearTimeout(this.tooltipTimeout)
                };
                f.prototype.getAnchor = function (c, f) {
                    var d = this.chart,
                        e = d.pointer,
                        a = d.inverted,
                        l = d.plotTop,
                        k = d.plotLeft,
                        h = 0,
                        x = 0,
                        B, q;
                    c = D(c);
                    this.followPointer && f ? ("undefined" === typeof f.chartX && (f = e.normalize(f)), c = [f.chartX - d.plotLeft, f.chartY - l]) : c[0].tooltipPos ? c = c[0].tooltipPos : (c.forEach(function (e) {
                        B = e.series.yAxis;
                        q = e.series.xAxis;
                        h += e.plotX + (!a && q ? q.left - k : 0);
                        x += (e.plotLow ? (e.plotLow + e.plotHigh) / 2 :
                            e.plotY) + (!a && B ? B.top - l : 0)
                    }), h /= c.length, x /= c.length, c = [a ? d.plotWidth - x : h, this.shared && !a && 1 < c.length && f ? f.chartY - l : a ? d.plotHeight - h : x]);
                    return c.map(Math.round)
                };
                f.prototype.getDateFormat = function (c, f, d, e) {
                    var a = this.chart.time,
                        l = a.dateFormat("%m-%d %H:%M:%S.%L", f),
                        k = {
                            millisecond: 15,
                            second: 12,
                            minute: 9,
                            hour: 6,
                            day: 3
                        },
                        m = "millisecond";
                    for (x in N) {
                        if (c === N.week && +a.dateFormat("%w", f) === d && "00:00:00.000" === l.substr(6)) {
                            var x = "week";
                            break
                        }
                        if (N[x] > c) {
                            x = m;
                            break
                        }
                        if (k[x] && l.substr(k[x]) !== "01-01 00:00:00.000".substr(k[x])) break;
                        "week" !== x && (m = x)
                    }
                    if (x) var h = a.resolveDTLFormat(e[x]).main;
                    return h
                };
                f.prototype.getLabel = function () {
                    var c, f = this,
                        m = this.chart.renderer,
                        e = this.chart.styledMode,
                        a = this.options,
                        l = "tooltip" + (J(a.className) ? " " + a.className : ""),
                        t;
                    if (!this.label) {
                        this.outside && (this.container = t = d.doc.createElement("div"), t.className = "highcharts-tooltip-container", v(t, {
                            position: "absolute",
                            top: "1px",
                            pointerEvents: a.style && a.style.pointerEvents,
                            zIndex: 3
                        }), d.doc.body.appendChild(t), this.renderer = m = new d.Renderer(t, 0, 0, {}, void 0,
                            void 0, m.styledMode));
                        this.split ? this.label = m.g(l) : (this.label = m.label("", 0, 0, a.shape || "callout", null, null, a.useHTML, null, l).attr({
                            padding: a.padding,
                            r: a.borderRadius
                        }), e || this.label.attr({
                            fill: a.backgroundColor,
                            "stroke-width": a.borderWidth
                        }).css(a.style).shadow(a.shadow));
                        e && (this.applyFilter(), this.label.addClass("highcharts-tooltip-" + this.chart.index));
                        if (f.outside && !f.split) {
                            var h = {
                                x: this.label.xSetter,
                                y: this.label.ySetter
                            };
                            this.label.xSetter = function (a, e) {
                                h[e].call(this.label, f.distance);
                                t.style.left =
                                    a + "px"
                            };
                            this.label.ySetter = function (a, e) {
                                h[e].call(this.label, f.distance);
                                t.style.top = a + "px"
                            }
                        }
                        this.label.attr({
                            zIndex: 8,
                            pointerEvents: (null === (c = a.style) || void 0 === c ? 0 : c.pointerEvents) || a.stickOnHover ? "auto" : "none"
                        }).add()
                    }
                    return this.label
                };
                f.prototype.getPosition = function (c, f, d) {
                    var e = this.chart,
                        a = this.distance,
                        l = {},
                        k = e.inverted && d.h || 0,
                        m, x = this.outside,
                        h = x ? q.documentElement.clientWidth - 2 * a : e.chartWidth,
                        g = x ? Math.max(q.body.scrollHeight, q.documentElement.scrollHeight, q.body.offsetHeight, q.documentElement.offsetHeight,
                            q.documentElement.clientHeight) : e.chartHeight,
                        Q = e.pointer.getChartPosition(),
                        I = e.containerScaling,
                        K = function (b) {
                            return I ? b * I.scaleX : b
                        },
                        n = function (b) {
                            return I ? b * I.scaleY : b
                        },
                        b = function (b) {
                            var l = "x" === b;
                            return [b, l ? h : g, l ? c : f].concat(x ? [l ? K(c) : n(f), l ? Q.left - a + K(d.plotX + e.plotLeft) : Q.top - a + n(d.plotY + e.plotTop), 0, l ? h : g] : [l ? c : f, l ? d.plotX + e.plotLeft : d.plotY + e.plotTop, l ? e.plotLeft : e.plotTop, l ? e.plotLeft + e.plotWidth : e.plotTop + e.plotHeight])
                        },
                        C = b("y"),
                        w = b("x"),
                        R = !this.followPointer && u(d.ttBelow, !e.inverted ===
                            !!d.negative),
                        O = function (b, e, c, f, d, t, p) {
                            var w = "y" === b ? n(a) : K(a),
                                m = (c - f) / 2,
                                x = f < d - a,
                                h = d + a + f < e,
                                G = d - w - c + m;
                            d = d + w - m;
                            if (R && h) l[b] = d;
                            else if (!R && x) l[b] = G;
                            else if (x) l[b] = Math.min(p - f, 0 > G - k ? G : G - k);
                            else if (h) l[b] = Math.max(t, d + k + c > e ? d : d + k);
                            else return !1
                        },
                        y = function (b, e, c, f, d) {
                            var k;
                            d < a || d > e - a ? k = !1 : l[b] = d < c / 2 ? 1 : d > e - f / 2 ? e - f - 2 : d - c / 2;
                            return k
                        },
                        v = function (b) {
                            var a = C;
                            C = w;
                            w = a;
                            m = b
                        },
                        p = function () {
                            !1 !== O.apply(0, C) ? !1 !== y.apply(0, w) || m || (v(!0), p()) : m ? l.x = l.y = 0 : (v(!0), p())
                        };
                    (e.inverted || 1 < this.len) && v();
                    p();
                    return l
                };
                f.prototype.getXDateFormat =
                    function (c, f, d) {
                        f = f.dateTimeLabelFormats;
                        var e = d && d.closestPointRange;
                        return (e ? this.getDateFormat(e, c.x, d.options.startOfWeek, f) : f.day) || f.year
                    };
                f.prototype.hide = function (c) {
                    var f = this;
                    g.clearTimeout(this.hideTimer);
                    c = u(c, this.options.hideDelay, 500);
                    this.isHidden || (this.hideTimer = h(function () {
                        f.getLabel()[c ? "fadeOut" : "hide"]();
                        f.isHidden = !0
                    }, c))
                };
                f.prototype.init = function (c, f) {
                    this.chart = c;
                    this.options = f;
                    this.crosshairs = [];
                    this.now = {
                        x: 0,
                        y: 0
                    };
                    this.isHidden = !0;
                    this.split = f.split && !c.inverted && !c.polar;
                    this.shared = f.shared || this.split;
                    this.outside = u(f.outside, !(!c.scrollablePixelsX && !c.scrollablePixelsY))
                };
                f.prototype.move = function (c, f, d, e) {
                    var a = this,
                        l = a.now,
                        k = !1 !== a.options.animation && !a.isHidden && (1 < Math.abs(c - l.x) || 1 < Math.abs(f - l.y)),
                        m = a.followPointer || 1 < a.len;
                    E(l, {
                        x: k ? (2 * l.x + c) / 3 : c,
                        y: k ? (l.y + f) / 2 : f,
                        anchorX: m ? void 0 : k ? (2 * l.anchorX + d) / 3 : d,
                        anchorY: m ? void 0 : k ? (l.anchorY + e) / 2 : e
                    });
                    a.getLabel().attr(l);
                    k && (g.clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function () {
                        a && a.move(c, f,
                            d, e)
                    }, 32))
                };
                f.prototype.refresh = function (c, f) {
                    var k = this.chart,
                        e = this.options,
                        a = c,
                        l = {},
                        t = [],
                        h = e.formatter || this.defaultFormatter;
                    l = this.shared;
                    var x = k.styledMode;
                    if (e.enabled) {
                        g.clearTimeout(this.hideTimer);
                        this.followPointer = D(a)[0].series.tooltipOptions.followPointer;
                        var B = this.getAnchor(a, f);
                        f = B[0];
                        var q = B[1];
                        !l || a.series && a.series.noSharedTooltip ? l = a.getLabelConfig() : (k.pointer.applyInactiveState(a), a.forEach(function (a) {
                                a.setState("hover");
                                t.push(a.getLabelConfig())
                            }), l = {
                                x: a[0].category,
                                y: a[0].y
                            },
                            l.points = t, a = a[0]);
                        this.len = t.length;
                        k = h.call(l, this);
                        h = a.series;
                        this.distance = u(h.tooltipOptions.distance, 16);
                        !1 === k ? this.hide() : (this.split ? this.renderSplit(k, D(c)) : (c = this.getLabel(), e.style.width && !x || c.css({
                            width: this.chart.spacingBox.width
                        }), c.attr({
                            text: k && k.join ? k.join("") : k
                        }), c.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-" + u(a.colorIndex, h.colorIndex)), x || c.attr({
                            stroke: e.borderColor || a.color || h.color || "#666666"
                        }), this.updatePosition({
                            plotX: f,
                            plotY: q,
                            negative: a.negative,
                            ttBelow: a.ttBelow,
                            h: B[2] || 0
                        })), this.isHidden && this.label && this.label.attr({
                            opacity: 1
                        }).show(), this.isHidden = !1);
                        d.fireEvent(this, "refresh")
                    }
                };
                f.prototype.renderSplit = function (c, f) {
                    function k(b, a, e, c, f) {
                        void 0 === f && (f = !0);
                        e ? (a = v ? 0 : A, b = r(b - c / 2, O.left, O.right - c)) : (a -= p, b = f ? b - c - C : b + C, b = r(b, f ? b : O.left, O.right));
                        return {
                            x: b,
                            y: a
                        }
                    }
                    var e = this,
                        a = e.chart,
                        l = e.chart,
                        t = l.plotHeight,
                        h = l.plotLeft,
                        x = l.plotTop,
                        B = l.pointer,
                        q = l.renderer,
                        g = l.scrollablePixelsY,
                        I = void 0 === g ? 0 : g;
                    g = l.scrollingContainer;
                    g = void 0 === g ? {
                        scrollLeft: 0,
                        scrollTop: 0
                    } : g;
                    var K = g.scrollLeft,
                        n = g.scrollTop,
                        b = l.styledMode,
                        C = e.distance,
                        w = e.options,
                        R = e.options.positioner,
                        O = {
                            left: K,
                            right: K + l.chartWidth,
                            top: n,
                            bottom: n + l.chartHeight
                        },
                        y = e.getLabel(),
                        v = !(!a.xAxis[0] || !a.xAxis[0].opposite),
                        p = x + n,
                        D = 0,
                        A = t - I;
                    L(c) && (c = [!1, c]);
                    c = c.slice(0, f.length + 1).reduce(function (a, c, l) {
                        if (!1 !== c && "" !== c) {
                            l = f[l - 1] || {
                                isHeader: !0,
                                plotX: f[0].plotX,
                                plotY: t,
                                series: {}
                            };
                            var d = l.isHeader,
                                m = d ? e : l.series,
                                G = m.tt,
                                z = l.isHeader;
                            var B = l.series;
                            var g = "highcharts-color-" + u(l.colorIndex, B.colorIndex,
                                "none");
                            G || (G = {
                                padding: w.padding,
                                r: w.borderRadius
                            }, b || (G.fill = w.backgroundColor, G["stroke-width"] = w.borderWidth), G = q.label("", 0, 0, w[z ? "headerShape" : "shape"] || "callout", void 0, void 0, w.useHTML).addClass((z ? "highcharts-tooltip-header " : "") + "highcharts-tooltip-box " + g).attr(G).add(y));
                            G.isActive = !0;
                            G.attr({
                                text: c
                            });
                            b || G.css(w.style).shadow(w.shadow).attr({
                                stroke: w.borderColor || l.color || B.color || "#333333"
                            });
                            c = m.tt = G;
                            z = c.getBBox();
                            m = z.width + c.strokeWidth();
                            d && (D = z.height, A += D, v && (p -= D));
                            B = l.plotX;
                            B = void 0 ===
                                B ? 0 : B;
                            g = l.plotY;
                            g = void 0 === g ? 0 : g;
                            var H = l.series;
                            if (l.isHeader) {
                                B = h + B;
                                var K = x + t / 2
                            } else G = H.xAxis, H = H.yAxis, B = G.pos + r(B, -C, G.len + C), H.pos + g >= n + x && H.pos + g <= n + x + t - I && (K = H.pos + g);
                            B = r(B, O.left - C, O.right + C);
                            "number" === typeof K ? (z = z.height + 1, g = R ? R.call(e, m, z, l) : k(B, K, d, m), a.push({
                                align: R ? 0 : void 0,
                                anchorX: B,
                                anchorY: K,
                                boxWidth: m,
                                point: l,
                                rank: u(g.rank, d ? 1 : 0),
                                size: z,
                                target: g.y,
                                tt: c,
                                x: g.x
                            })) : c.isActive = !1
                        }
                        return a
                    }, []);
                    !R && c.some(function (b) {
                        return b.x < O.left
                    }) && (c = c.map(function (b) {
                        var a = k(b.anchorX, b.anchorY,
                            b.point.isHeader, b.boxWidth, !1);
                        return E(b, {
                            target: a.y,
                            x: a.x
                        })
                    }));
                    e.cleanSplit();
                    d.distribute(c, A);
                    c.forEach(function (b) {
                        var a = b.pos;
                        b.tt.attr({
                            visibility: "undefined" === typeof a ? "hidden" : "inherit",
                            x: b.x,
                            y: a + p,
                            anchorX: b.anchorX,
                            anchorY: b.anchorY
                        })
                    });
                    c = e.container;
                    a = e.renderer;
                    e.outside && c && a && (l = y.getBBox(), a.setSize(l.width + l.x, l.height + l.y, !1), B = B.getChartPosition(), c.style.left = B.left + "px", c.style.top = B.top + "px")
                };
                f.prototype.styledModeFormat = function (c) {
                    return c.replace('style="font-size: 10px"',
                        'class="highcharts-header"').replace(/style="color:{(point|series)\.color}"/g, 'class="highcharts-color-{$1.colorIndex}"')
                };
                f.prototype.tooltipFooterHeaderFormatter = function (c, f) {
                    var k = f ? "footer" : "header",
                        e = c.series,
                        a = e.tooltipOptions,
                        l = a.xDateFormat,
                        t = e.xAxis,
                        h = t && "datetime" === t.options.type && F(c.key),
                        x = a[k + "Format"];
                    f = {
                        isFooter: f,
                        labelConfig: c
                    };
                    d.fireEvent(this, "headerFormatter", f, function (f) {
                        h && !l && (l = this.getXDateFormat(c, a, t));
                        h && l && (c.point && c.point.tooltipDateKeys || ["key"]).forEach(function (a) {
                            x =
                                x.replace("{point." + a + "}", "{point." + a + ":" + l + "}")
                        });
                        e.chart.styledMode && (x = this.styledModeFormat(x));
                        f.text = A(x, {
                            point: c,
                            series: e
                        }, this.chart)
                    });
                    return f.text
                };
                f.prototype.update = function (c) {
                    this.destroy();
                    y(!0, this.chart.options.tooltip.userOptions, c);
                    this.init(this.chart, y(!0, this.options, c))
                };
                f.prototype.updatePosition = function (c) {
                    var f = this.chart,
                        d = f.pointer,
                        e = this.getLabel(),
                        a = c.plotX + f.plotLeft,
                        l = c.plotY + f.plotTop;
                    d = d.getChartPosition();
                    c = (this.options.positioner || this.getPosition).call(this,
                        e.width, e.height, c);
                    if (this.outside) {
                        var t = (this.options.borderWidth || 0) + 2 * this.distance;
                        this.renderer.setSize(e.width + t, e.height + t, !1);
                        if (f = f.containerScaling) v(this.container, {
                            transform: "scale(" + f.scaleX + ", " + f.scaleY + ")"
                        }), a *= f.scaleX, l *= f.scaleY;
                        a += d.left - c.x;
                        l += d.top - c.y
                    }
                    this.move(Math.round(c.x), Math.round(c.y || 0), a, l)
                };
                return f
            }();
        d.Tooltip = P;
        return d.Tooltip
    });
    S(r, "parts/Pointer.js", [r["parts/Globals.js"], r["parts/Utilities.js"], r["parts/Tooltip.js"], r["parts/Color.js"]], function (d, g, r, v) {
        var J =
            g.addEvent,
            M = g.attr,
            E = g.css,
            A = g.defined,
            F = g.extend,
            L = g.find,
            y = g.fireEvent,
            u = g.isNumber,
            D = g.isObject,
            h = g.objectEach,
            N = g.offset,
            q = g.pick,
            P = g.splat,
            f = v.parse,
            c = d.charts,
            k = d.noop;
        g = function () {
            function m(e, a) {
                this.lastValidTouch = {};
                this.pinchDown = [];
                this.runChartClick = !1;
                this.chart = e;
                this.hasDragged = !1;
                this.options = a;
                this.unbindContainerMouseLeave = function () {};
                this.init(e, a)
            }
            m.prototype.applyInactiveState = function (e) {
                var a = [],
                    c;
                (e || []).forEach(function (e) {
                    c = e.series;
                    a.push(c);
                    c.linkedParent && a.push(c.linkedParent);
                    c.linkedSeries && (a = a.concat(c.linkedSeries));
                    c.navigatorSeries && a.push(c.navigatorSeries)
                });
                this.chart.series.forEach(function (e) {
                    -1 === a.indexOf(e) ? e.setState("inactive", !0) : e.options.inactiveOtherPoints && e.setAllPointsToState("inactive")
                })
            };
            m.prototype.destroy = function () {
                var e = this;
                "undefined" !== typeof e.unDocMouseMove && e.unDocMouseMove();
                this.unbindContainerMouseLeave();
                d.chartCount || (d.unbindDocumentMouseUp && (d.unbindDocumentMouseUp = d.unbindDocumentMouseUp()), d.unbindDocumentTouchEnd && (d.unbindDocumentTouchEnd =
                    d.unbindDocumentTouchEnd()));
                clearInterval(e.tooltipTimeout);
                h(e, function (a, c) {
                    e[c] = null
                })
            };
            m.prototype.drag = function (e) {
                var a = this.chart,
                    c = a.options.chart,
                    d = e.chartX,
                    k = e.chartY,
                    x = this.zoomHor,
                    m = this.zoomVert,
                    h = a.plotLeft,
                    q = a.plotTop,
                    g = a.plotWidth,
                    u = a.plotHeight,
                    n = this.selectionMarker,
                    b = this.mouseDownX || 0,
                    C = this.mouseDownY || 0,
                    w = D(c.panning) ? c.panning && c.panning.enabled : c.panning,
                    y = c.panKey && e[c.panKey + "Key"];
                if (!n || !n.touch)
                    if (d < h ? d = h : d > h + g && (d = h + g), k < q ? k = q : k > q + u && (k = q + u), this.hasDragged = Math.sqrt(Math.pow(b -
                            d, 2) + Math.pow(C - k, 2)), 10 < this.hasDragged) {
                        var O = a.isInsidePlot(b - h, C - q);
                        a.hasCartesianSeries && (this.zoomX || this.zoomY) && O && !y && !n && (this.selectionMarker = n = a.renderer.rect(h, q, x ? 1 : g, m ? 1 : u, 0).attr({
                            "class": "highcharts-selection-marker",
                            zIndex: 7
                        }).add(), a.styledMode || n.attr({
                            fill: c.selectionMarkerFill || f("#335cad").setOpacity(.25).get()
                        }));
                        n && x && (d -= b, n.attr({
                            width: Math.abs(d),
                            x: (0 < d ? 0 : d) + b
                        }));
                        n && m && (d = k - C, n.attr({
                            height: Math.abs(d),
                            y: (0 < d ? 0 : d) + C
                        }));
                        O && !n && w && a.pan(e, c.panning)
                    }
            };
            m.prototype.dragStart =
                function (e) {
                    var a = this.chart;
                    a.mouseIsDown = e.type;
                    a.cancelClick = !1;
                    a.mouseDownX = this.mouseDownX = e.chartX;
                    a.mouseDownY = this.mouseDownY = e.chartY
                };
            m.prototype.drop = function (e) {
                var a = this,
                    c = this.chart,
                    f = this.hasPinched;
                if (this.selectionMarker) {
                    var d = {
                            originalEvent: e,
                            xAxis: [],
                            yAxis: []
                        },
                        k = this.selectionMarker,
                        m = k.attr ? k.attr("x") : k.x,
                        h = k.attr ? k.attr("y") : k.y,
                        q = k.attr ? k.attr("width") : k.width,
                        g = k.attr ? k.attr("height") : k.height,
                        K;
                    if (this.hasDragged || f) c.axes.forEach(function (c) {
                        if (c.zoomEnabled && A(c.min) &&
                            (f || a[{
                                xAxis: "zoomX",
                                yAxis: "zoomY"
                            } [c.coll]])) {
                            var b = c.horiz,
                                l = "touchend" === e.type ? c.minPixelPadding : 0,
                                k = c.toValue((b ? m : h) + l);
                            b = c.toValue((b ? m + q : h + g) - l);
                            d[c.coll].push({
                                axis: c,
                                min: Math.min(k, b),
                                max: Math.max(k, b)
                            });
                            K = !0
                        }
                    }), K && y(c, "selection", d, function (a) {
                        c.zoom(F(a, f ? {
                            animation: !1
                        } : null))
                    });
                    u(c.index) && (this.selectionMarker = this.selectionMarker.destroy());
                    f && this.scaleGroups()
                }
                c && u(c.index) && (E(c.container, {
                    cursor: c._cursor
                }), c.cancelClick = 10 < this.hasDragged, c.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = [])
            };
            m.prototype.findNearestKDPoint = function (e, a, c) {
                var f;
                if (this.isStickyTooltip(c)) return this.chart.hoverPoint;
                e.forEach(function (e) {
                    var l = !(e.noSharedTooltip && a) && 0 > e.options.findNearestPointBy.indexOf("y");
                    e = e.searchPoint(c, l);
                    if ((l = D(e, !0)) && !(l = !D(f, !0))) {
                        l = f.distX - e.distX;
                        var d = f.dist - e.dist,
                            k = (e.series.group && e.series.group.zIndex) - (f.series.group && f.series.group.zIndex);
                        l = 0 < (0 !== l && a ? l : 0 !== d ? d : 0 !== k ? k : f.series.index > e.series.index ? -1 : 1)
                    }
                    l && (f = e)
                });
                return f
            };
            m.prototype.getChartCoordinatesFromPoint =
                function (e, a) {
                    var c = e.series,
                        f = c.xAxis;
                    c = c.yAxis;
                    var d = q(e.clientX, e.plotX),
                        k = e.shapeArgs;
                    if (f && c) return a ? {
                        chartX: f.len + f.pos - d,
                        chartY: c.len + c.pos - e.plotY
                    } : {
                        chartX: d + f.pos,
                        chartY: e.plotY + c.pos
                    };
                    if (k && k.x && k.y) return {
                        chartX: k.x,
                        chartY: k.y
                    }
                };
            m.prototype.getChartPosition = function () {
                return this.chartPosition || (this.chartPosition = N(this.chart.container))
            };
            m.prototype.getCoordinates = function (e) {
                var a = {
                    xAxis: [],
                    yAxis: []
                };
                this.chart.axes.forEach(function (c) {
                    a[c.isXAxis ? "xAxis" : "yAxis"].push({
                        axis: c,
                        value: c.toValue(e[c.horiz ?
                            "chartX" : "chartY"])
                    })
                });
                return a
            };
            m.prototype.getHoverData = function (e, a, c, f, d, k) {
                var l, m = [];
                f = !(!f || !e);
                var t = a && !a.stickyTracking,
                    h = {
                        chartX: k ? k.chartX : void 0,
                        chartY: k ? k.chartY : void 0,
                        shared: d
                    };
                y(this, "beforeGetHoverData", h);
                t = t ? [a] : c.filter(function (a) {
                    return h.filter ? h.filter(a) : a.visible && !(!d && a.directTouch) && q(a.options.enableMouseTracking, !0) && a.stickyTracking
                });
                a = (l = f || !k ? e : this.findNearestKDPoint(t, d, k)) && l.series;
                l && (d && !a.noSharedTooltip ? (t = c.filter(function (a) {
                    return h.filter ? h.filter(a) :
                        a.visible && !(!d && a.directTouch) && q(a.options.enableMouseTracking, !0) && !a.noSharedTooltip
                }), t.forEach(function (a) {
                    var e = L(a.points, function (b) {
                        return b.x === l.x && !b.isNull
                    });
                    D(e) && (a.chart.isBoosting && (e = a.getPoint(e)), m.push(e))
                })) : m.push(l));
                h = {
                    hoverPoint: l
                };
                y(this, "afterGetHoverData", h);
                return {
                    hoverPoint: h.hoverPoint,
                    hoverSeries: a,
                    hoverPoints: m
                }
            };
            m.prototype.getPointFromEvent = function (e) {
                e = e.target;
                for (var a; e && !a;) a = e.point, e = e.parentNode;
                return a
            };
            m.prototype.onTrackerMouseOut = function (e) {
                var a =
                    this.chart.hoverSeries,
                    c = e.relatedTarget || e.toElement;
                this.isDirectTouch = !1;
                if (!(!a || !c || a.stickyTracking || this.isStickyTooltip(e) || this.inClass(c, "highcharts-tooltip") || this.inClass(c, "highcharts-series-" + a.index) && this.inClass(c, "highcharts-tracker"))) a.onMouseOut()
            };
            m.prototype.inClass = function (e, a) {
                for (var c; e;) {
                    if (c = M(e, "class")) {
                        if (-1 !== c.indexOf(a)) return !0;
                        if (-1 !== c.indexOf("highcharts-container")) return !1
                    }
                    e = e.parentNode
                }
            };
            m.prototype.init = function (e, a) {
                this.options = a;
                this.chart = e;
                this.runChartClick =
                    a.chart.events && !!a.chart.events.click;
                this.pinchDown = [];
                this.lastValidTouch = {};
                r && (e.tooltip = new r(e, a.tooltip), this.followTouchMove = q(a.tooltip.followTouchMove, !0));
                this.setDOMEvents()
            };
            m.prototype.isStickyTooltip = function (e) {
                var a = this.chart,
                    c = this.chartPosition,
                    f = a.hoverPoint,
                    k = a.tooltip;
                a = e.chartX;
                e = e.chartY;
                var m = !1;
                if (c && f && f.graphic && k && !k.isHidden && k.options.stickOnHover && k.label) {
                    m = k.label.getBBox();
                    var h = d.offset(k.label.element);
                    k = f.graphic.getBBox();
                    f = d.offset(f.graphic.element);
                    m.x =
                        h.left - c.left;
                    m.y = h.top - c.top;
                    k.x = f.left - c.left;
                    k.y = f.top - c.top;
                    c = Math.min(k.y, m.y);
                    f = Math.max(k.x + k.width, m.x + m.width);
                    h = Math.max(k.y + k.height, m.y + m.height);
                    m = a >= Math.min(k.x, m.x) && a <= f && e >= c && e <= h
                }
                return m
            };
            m.prototype.normalize = function (c, a) {
                var e = c.touches,
                    f = e ? e.length ? e.item(0) : e.changedTouches[0] : c;
                a || (a = this.getChartPosition());
                e = f.pageX - a.left;
                a = f.pageY - a.top;
                if (f = this.chart.containerScaling) e /= f.scaleX, a /= f.scaleY;
                return F(c, {
                    chartX: Math.round(e),
                    chartY: Math.round(a)
                })
            };
            m.prototype.onContainerClick =
                function (c) {
                    var a = this.chart,
                        e = a.hoverPoint,
                        f = a.plotLeft,
                        d = a.plotTop;
                    c = this.normalize(c);
                    a.cancelClick || (e && this.inClass(c.target, "highcharts-tracker") ? (y(e.series, "click", F(c, {
                        point: e
                    })), a.hoverPoint && e.firePointEvent("click", c)) : (F(c, this.getCoordinates(c)), a.isInsidePlot(c.chartX - f, c.chartY - d) && y(a, "click", c)))
                };
            m.prototype.onContainerMouseDown = function (c) {
                c = this.normalize(c);
                2 !== c.button && (this.zoomOption(c), c.preventDefault && c.preventDefault(), this.dragStart(c))
            };
            m.prototype.onContainerMouseLeave =
                function (e) {
                    var a = c[d.hoverChartIndex];
                    a && (e.relatedTarget || e.toElement) && (a.pointer.reset(), a.pointer.chartPosition = void 0)
                };
            m.prototype.onContainerMouseMove = function (e) {
                var a = this.chart;
                A(d.hoverChartIndex) && c[d.hoverChartIndex] && c[d.hoverChartIndex].mouseIsDown || (d.hoverChartIndex = a.index);
                e = this.normalize(e);
                e.preventDefault || (e.returnValue = !1);
                "mousedown" === a.mouseIsDown && this.drag(e);
                a.openMenu || this.isStickyTooltip(e) || !this.inClass(e.target, "highcharts-tracker") && !a.isInsidePlot(e.chartX -
                    a.plotLeft, e.chartY - a.plotTop) || this.runPointActions(e)
            };
            m.prototype.onDocumentTouchEnd = function (e) {
                c[d.hoverChartIndex] && c[d.hoverChartIndex].pointer.drop(e)
            };
            m.prototype.onContainerTouchMove = function (c) {
                this.touch(c)
            };
            m.prototype.onContainerTouchStart = function (c) {
                this.zoomOption(c);
                this.touch(c, !0)
            };
            m.prototype.onDocumentMouseMove = function (c) {
                var a = this.chart,
                    e = this.chartPosition;
                c = this.normalize(c, e);
                !e || this.isStickyTooltip(c) || this.inClass(c.target, "highcharts-tracker") || a.isInsidePlot(c.chartX -
                    a.plotLeft, c.chartY - a.plotTop) || this.reset()
            };
            m.prototype.onDocumentMouseUp = function (e) {
                c[d.hoverChartIndex] && c[d.hoverChartIndex].pointer.drop(e)
            };
            m.prototype.pinch = function (c) {
                var a = this,
                    e = a.chart,
                    f = a.pinchDown,
                    d = c.touches || [],
                    m = d.length,
                    h = a.lastValidTouch,
                    g = a.hasZoom,
                    u = a.selectionMarker,
                    I = {},
                    K = 1 === m && (a.inClass(c.target, "highcharts-tracker") && e.runTrackerClick || a.runChartClick),
                    n = {};
                1 < m && (a.initiated = !0);
                g && a.initiated && !K && c.preventDefault();
                [].map.call(d, function (b) {
                    return a.normalize(b)
                });
                "touchstart" ===
                c.type ? ([].forEach.call(d, function (b, a) {
                        f[a] = {
                            chartX: b.chartX,
                            chartY: b.chartY
                        }
                    }), h.x = [f[0].chartX, f[1] && f[1].chartX], h.y = [f[0].chartY, f[1] && f[1].chartY], e.axes.forEach(function (b) {
                        if (b.zoomEnabled) {
                            var a = e.bounds[b.horiz ? "h" : "v"],
                                c = b.minPixelPadding,
                                f = b.toPixels(Math.min(q(b.options.min, b.dataMin), b.dataMin)),
                                d = b.toPixels(Math.max(q(b.options.max, b.dataMax), b.dataMax)),
                                l = Math.max(f, d);
                            a.min = Math.min(b.pos, Math.min(f, d) - c);
                            a.max = Math.max(b.pos + b.len, l + c)
                        }
                    }), a.res = !0) : a.followTouchMove && 1 === m ? this.runPointActions(a.normalize(c)) :
                    f.length && (u || (a.selectionMarker = u = F({
                        destroy: k,
                        touch: !0
                    }, e.plotBox)), a.pinchTranslate(f, d, I, u, n, h), a.hasPinched = g, a.scaleGroups(I, n), a.res && (a.res = !1, this.reset(!1, 0)))
            };
            m.prototype.pinchTranslate = function (c, a, f, d, k, m) {
                this.zoomHor && this.pinchTranslateDirection(!0, c, a, f, d, k, m);
                this.zoomVert && this.pinchTranslateDirection(!1, c, a, f, d, k, m)
            };
            m.prototype.pinchTranslateDirection = function (c, a, f, d, k, m, h, q) {
                var e = this.chart,
                    l = c ? "x" : "y",
                    t = c ? "X" : "Y",
                    n = "chart" + t,
                    b = c ? "width" : "height",
                    x = e["plot" + (c ? "Left" : "Top")],
                    w, g, z = q || 1,
                    B = e.inverted,
                    u = e.bounds[c ? "h" : "v"],
                    p = 1 === a.length,
                    H = a[0][n],
                    y = f[0][n],
                    v = !p && a[1][n],
                    G = !p && f[1][n];
                f = function () {
                    "number" === typeof G && 20 < Math.abs(H - v) && (z = q || Math.abs(y - G) / Math.abs(H - v));
                    g = (x - y) / z + H;
                    w = e["plot" + (c ? "Width" : "Height")] / z
                };
                f();
                a = g;
                if (a < u.min) {
                    a = u.min;
                    var V = !0
                } else a + w > u.max && (a = u.max - w, V = !0);
                V ? (y -= .8 * (y - h[l][0]), "number" === typeof G && (G -= .8 * (G - h[l][1])), f()) : h[l] = [y, G];
                B || (m[l] = g - x, m[b] = w);
                m = B ? 1 / z : z;
                k[b] = w;
                k[l] = a;
                d[B ? c ? "scaleY" : "scaleX" : "scale" + t] = z;
                d["translate" + t] = m * x + (y - m * H)
            };
            m.prototype.reset = function (c, a) {
                var e = this.chart,
                    f = e.hoverSeries,
                    d = e.hoverPoint,
                    k = e.hoverPoints,
                    m = e.tooltip,
                    h = m && m.shared ? k : d;
                c && h && P(h).forEach(function (a) {
                    a.series.isCartesian && "undefined" === typeof a.plotX && (c = !1)
                });
                if (c) m && h && P(h).length && (m.refresh(h), m.shared && k ? k.forEach(function (a) {
                    a.setState(a.state, !0);
                    a.series.isCartesian && (a.series.xAxis.crosshair && a.series.xAxis.drawCrosshair(null, a), a.series.yAxis.crosshair && a.series.yAxis.drawCrosshair(null, a))
                }) : d && (d.setState(d.state, !0), e.axes.forEach(function (a) {
                    a.crosshair &&
                        d.series[a.coll] === a && a.drawCrosshair(null, d)
                })));
                else {
                    if (d) d.onMouseOut();
                    k && k.forEach(function (a) {
                        a.setState()
                    });
                    if (f) f.onMouseOut();
                    m && m.hide(a);
                    this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove());
                    e.axes.forEach(function (a) {
                        a.hideCrosshair()
                    });
                    this.hoverX = e.hoverPoints = e.hoverPoint = null
                }
            };
            m.prototype.runPointActions = function (e, a) {
                var f = this.chart,
                    k = f.tooltip && f.tooltip.options.enabled ? f.tooltip : void 0,
                    m = k ? k.shared : !1,
                    h = a || f.hoverPoint,
                    g = h && h.series || f.hoverSeries;
                g = this.getHoverData(h,
                    g, f.series, (!e || "touchmove" !== e.type) && (!!a || g && g.directTouch && this.isDirectTouch), m, e);
                h = g.hoverPoint;
                var u = g.hoverPoints;
                a = (g = g.hoverSeries) && g.tooltipOptions.followPointer;
                m = m && g && !g.noSharedTooltip;
                if (h && (h !== f.hoverPoint || k && k.isHidden)) {
                    (f.hoverPoints || []).forEach(function (a) {
                        -1 === u.indexOf(a) && a.setState()
                    });
                    if (f.hoverSeries !== g) g.onMouseOver();
                    this.applyInactiveState(u);
                    (u || []).forEach(function (a) {
                        a.setState("hover")
                    });
                    f.hoverPoint && f.hoverPoint.firePointEvent("mouseOut");
                    if (!h.series) return;
                    h.firePointEvent("mouseOver");
                    f.hoverPoints = u;
                    f.hoverPoint = h;
                    k && k.refresh(m ? u : h, e)
                } else a && k && !k.isHidden && (h = k.getAnchor([{}], e), k.updatePosition({
                    plotX: h[0],
                    plotY: h[1]
                }));
                this.unDocMouseMove || (this.unDocMouseMove = J(f.container.ownerDocument, "mousemove", function (a) {
                    var e = c[d.hoverChartIndex];
                    if (e) e.pointer.onDocumentMouseMove(a)
                }));
                f.axes.forEach(function (a) {
                    var c = q(a.crosshair.snap, !0),
                        f = c ? L(u, function (c) {
                            return c.series[a.coll] === a
                        }) : void 0;
                    f || !c ? a.drawCrosshair(e, f) : a.hideCrosshair()
                })
            };
            m.prototype.scaleGroups =
                function (c, a) {
                    var e = this.chart,
                        f;
                    e.series.forEach(function (d) {
                        f = c || d.getPlotBox();
                        d.xAxis && d.xAxis.zoomEnabled && d.group && (d.group.attr(f), d.markerGroup && (d.markerGroup.attr(f), d.markerGroup.clip(a ? e.clipRect : null)), d.dataLabelsGroup && d.dataLabelsGroup.attr(f))
                    });
                    e.clipRect.attr(a || e.clipBox)
                };
            m.prototype.setDOMEvents = function () {
                var c = this,
                    a = c.chart.container,
                    f = a.ownerDocument;
                a.onmousedown = function (a) {
                    c.onContainerMouseDown(a)
                };
                a.onmousemove = function (a) {
                    c.onContainerMouseMove(a)
                };
                a.onclick = function (a) {
                    c.onContainerClick(a)
                };
                this.unbindContainerMouseLeave = J(a, "mouseleave", c.onContainerMouseLeave);
                d.unbindDocumentMouseUp || (d.unbindDocumentMouseUp = J(f, "mouseup", c.onDocumentMouseUp));
                d.hasTouch && (J(a, "touchstart", function (a) {
                    c.onContainerTouchStart(a)
                }), J(a, "touchmove", function (a) {
                    c.onContainerTouchMove(a)
                }), d.unbindDocumentTouchEnd || (d.unbindDocumentTouchEnd = J(f, "touchend", c.onDocumentTouchEnd)))
            };
            m.prototype.touch = function (c, a) {
                var e = this.chart,
                    f;
                if (e.index !== d.hoverChartIndex) this.onContainerMouseLeave({
                    relatedTarget: !0
                });
                d.hoverChartIndex = e.index;
                if (1 === c.touches.length)
                    if (c = this.normalize(c), (f = e.isInsidePlot(c.chartX - e.plotLeft, c.chartY - e.plotTop)) && !e.openMenu) {
                        a && this.runPointActions(c);
                        if ("touchmove" === c.type) {
                            a = this.pinchDown;
                            var k = a[0] ? 4 <= Math.sqrt(Math.pow(a[0].chartX - c.chartX, 2) + Math.pow(a[0].chartY - c.chartY, 2)) : !1
                        }
                        q(k, !0) && this.pinch(c)
                    } else a && this.reset();
                else 2 === c.touches.length && this.pinch(c)
            };
            m.prototype.zoomOption = function (c) {
                var a = this.chart,
                    e = a.options.chart,
                    f = e.zoomType || "";
                a = a.inverted;
                /touch/.test(c.type) &&
                    (f = q(e.pinchType, f));
                this.zoomX = c = /x/.test(f);
                this.zoomY = f = /y/.test(f);
                this.zoomHor = c && !a || f && a;
                this.zoomVert = f && !a || c && a;
                this.hasZoom = c || f
            };
            return m
        }();
        d.Pointer = g;
        return d.Pointer
    });
    S(r, "parts/MSPointer.js", [r["parts/Globals.js"], r["parts/Pointer.js"], r["parts/Utilities.js"]], function (d, g, r) {
        function v() {
            var d = [];
            d.item = function (d) {
                return this[d]
            };
            F(h, function (h) {
                d.push({
                    pageX: h.pageX,
                    pageY: h.pageY,
                    target: h.target
                })
            });
            return d
        }

        function J(h, g, f, c) {
            "touch" !== h.pointerType && h.pointerType !== h.MSPOINTER_TYPE_TOUCH ||
                !y[d.hoverChartIndex] || (c(h), c = y[d.hoverChartIndex].pointer, c[g]({
                    type: f,
                    target: h.currentTarget,
                    preventDefault: D,
                    touches: v()
                }))
        }
        var M = this && this.__extends || function () {
                var d = function (h, f) {
                    d = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function (c, f) {
                        c.__proto__ = f
                    } || function (c, f) {
                        for (var d in f) f.hasOwnProperty(d) && (c[d] = f[d])
                    };
                    return d(h, f)
                };
                return function (h, f) {
                    function c() {
                        this.constructor = h
                    }
                    d(h, f);
                    h.prototype = null === f ? Object.create(f) : (c.prototype = f.prototype, new c)
                }
            }(),
            E = r.addEvent,
            A =
            r.css,
            F = r.objectEach,
            L = r.removeEvent,
            y = d.charts,
            u = d.doc,
            D = d.noop,
            h = {},
            N = !!d.win.PointerEvent;
        return function (d) {
            function g() {
                return null !== d && d.apply(this, arguments) || this
            }
            M(g, d);
            g.prototype.batchMSEvents = function (f) {
                f(this.chart.container, N ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown);
                f(this.chart.container, N ? "pointermove" : "MSPointerMove", this.onContainerPointerMove);
                f(u, N ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp)
            };
            g.prototype.destroy = function () {
                this.batchMSEvents(L);
                d.prototype.destroy.call(this)
            };
            g.prototype.init = function (f, c) {
                d.prototype.init.call(this, f, c);
                this.hasZoom && A(f.container, {
                    "-ms-touch-action": "none",
                    "touch-action": "none"
                })
            };
            g.prototype.onContainerPointerDown = function (f) {
                J(f, "onContainerTouchStart", "touchstart", function (c) {
                    h[c.pointerId] = {
                        pageX: c.pageX,
                        pageY: c.pageY,
                        target: c.currentTarget
                    }
                })
            };
            g.prototype.onContainerPointerMove = function (f) {
                J(f, "onContainerTouchMove", "touchmove", function (c) {
                    h[c.pointerId] = {
                        pageX: c.pageX,
                        pageY: c.pageY
                    };
                    h[c.pointerId].target || (h[c.pointerId].target =
                        c.currentTarget)
                })
            };
            g.prototype.onDocumentPointerUp = function (f) {
                J(f, "onDocumentTouchEnd", "touchend", function (c) {
                    delete h[c.pointerId]
                })
            };
            g.prototype.setDOMEvents = function () {
                d.prototype.setDOMEvents.call(this);
                (this.hasZoom || this.followTouchMove) && this.batchMSEvents(E)
            };
            return g
        }(g)
    });
    S(r, "parts/Legend.js", [r["parts/Globals.js"], r["parts/Utilities.js"]], function (d, g) {
        var r = g.addEvent,
            v = g.css,
            J = g.defined,
            M = g.discardElement,
            E = g.find,
            A = g.fireEvent,
            F = g.format,
            L = g.isNumber,
            y = g.merge,
            u = g.pick,
            D = g.relativeLength,
            h = g.setAnimation,
            N = g.stableSort,
            q = g.syncTimeout;
        g = g.wrap;
        var P = d.isFirefox,
            f = d.marginNames,
            c = d.win,
            k = function () {
                function c(c, a) {
                    this.allItems = [];
                    this.contentGroup = this.box = void 0;
                    this.display = !1;
                    this.group = void 0;
                    this.offsetWidth = this.maxLegendWidth = this.maxItemWidth = this.legendWidth = this.legendHeight = this.lastLineHeight = this.lastItemY = this.itemY = this.itemX = this.itemMarginTop = this.itemMarginBottom = this.itemHeight = this.initialItemY = 0;
                    this.options = {};
                    this.padding = 0;
                    this.pages = [];
                    this.proximate = !1;
                    this.scrollGroup =
                        void 0;
                    this.widthOption = this.totalItemWidth = this.titleHeight = this.symbolWidth = this.symbolHeight = 0;
                    this.chart = c;
                    this.init(c, a)
                }
                c.prototype.init = function (c, a) {
                    this.chart = c;
                    this.setOptions(a);
                    a.enabled && (this.render(), r(this.chart, "endResize", function () {
                        this.legend.positionCheckboxes()
                    }), this.proximate ? this.unchartrender = r(this.chart, "render", function () {
                        this.legend.proximatePositions();
                        this.legend.positionItems()
                    }) : this.unchartrender && this.unchartrender())
                };
                c.prototype.setOptions = function (c) {
                    var a = u(c.padding,
                        8);
                    this.options = c;
                    this.chart.styledMode || (this.itemStyle = c.itemStyle, this.itemHiddenStyle = y(this.itemStyle, c.itemHiddenStyle));
                    this.itemMarginTop = c.itemMarginTop || 0;
                    this.itemMarginBottom = c.itemMarginBottom || 0;
                    this.padding = a;
                    this.initialItemY = a - 5;
                    this.symbolWidth = u(c.symbolWidth, 16);
                    this.pages = [];
                    this.proximate = "proximate" === c.layout && !this.chart.inverted;
                    this.baseline = void 0
                };
                c.prototype.update = function (c, a) {
                    var e = this.chart;
                    this.setOptions(y(!0, this.options, c));
                    this.destroy();
                    e.isDirtyLegend = e.isDirtyBox = !0;
                    u(a, !0) && e.redraw();
                    A(this, "afterUpdate")
                };
                c.prototype.colorizeItem = function (c, a) {
                    c.legendGroup[a ? "removeClass" : "addClass"]("highcharts-legend-item-hidden");
                    if (!this.chart.styledMode) {
                        var e = this.options,
                            f = c.legendItem,
                            d = c.legendLine,
                            k = c.legendSymbol,
                            h = this.itemHiddenStyle.color;
                        e = a ? e.itemStyle.color : h;
                        var m = a ? c.color || h : h,
                            g = c.options && c.options.marker,
                            q = {
                                fill: m
                            };
                        f && f.css({
                            fill: e,
                            color: e
                        });
                        d && d.attr({
                            stroke: m
                        });
                        k && (g && k.isMarker && (q = c.pointAttribs(), a || (q.stroke = q.fill = h)), k.attr(q))
                    }
                    A(this, "afterColorizeItem", {
                        item: c,
                        visible: a
                    })
                };
                c.prototype.positionItems = function () {
                    this.allItems.forEach(this.positionItem, this);
                    this.chart.isResizing || this.positionCheckboxes()
                };
                c.prototype.positionItem = function (c) {
                    var a = this.options,
                        e = a.symbolPadding;
                    a = !a.rtl;
                    var f = c._legendItemPos,
                        d = f[0];
                    f = f[1];
                    var k = c.checkbox;
                    if ((c = c.legendGroup) && c.element) c[J(c.translateY) ? "animate" : "attr"]({
                        translateX: a ? d : this.legendWidth - d - 2 * e - 4,
                        translateY: f
                    });
                    k && (k.x = d, k.y = f)
                };
                c.prototype.destroyItem = function (c) {
                    var a = c.checkbox;
                    ["legendItem", "legendLine",
                        "legendSymbol", "legendGroup"
                    ].forEach(function (a) {
                        c[a] && (c[a] = c[a].destroy())
                    });
                    a && M(c.checkbox)
                };
                c.prototype.destroy = function () {
                    function c(a) {
                        this[a] && (this[a] = this[a].destroy())
                    }
                    this.getAllItems().forEach(function (a) {
                        ["legendItem", "legendGroup"].forEach(c, a)
                    });
                    "clipRect up down pager nav box title group".split(" ").forEach(c, this);
                    this.display = null
                };
                c.prototype.positionCheckboxes = function () {
                    var c = this.group && this.group.alignAttr,
                        a = this.clipHeight || this.legendHeight,
                        f = this.titleHeight;
                    if (c) {
                        var d =
                            c.translateY;
                        this.allItems.forEach(function (e) {
                            var k = e.checkbox;
                            if (k) {
                                var l = d + f + k.y + (this.scrollOffset || 0) + 3;
                                v(k, {
                                    left: c.translateX + e.checkboxOffset + k.x - 20 + "px",
                                    top: l + "px",
                                    display: this.proximate || l > d - 6 && l < d + a - 6 ? "" : "none"
                                })
                            }
                        }, this)
                    }
                };
                c.prototype.renderTitle = function () {
                    var c = this.options,
                        a = this.padding,
                        f = c.title,
                        d = 0;
                    f.text && (this.title || (this.title = this.chart.renderer.label(f.text, a - 3, a - 4, null, null, null, c.useHTML, null, "legend-title").attr({
                            zIndex: 1
                        }), this.chart.styledMode || this.title.css(f.style), this.title.add(this.group)),
                        f.width || this.title.css({
                            width: this.maxLegendWidth + "px"
                        }), c = this.title.getBBox(), d = c.height, this.offsetWidth = c.width, this.contentGroup.attr({
                            translateY: d
                        }));
                    this.titleHeight = d
                };
                c.prototype.setText = function (c) {
                    var a = this.options;
                    c.legendItem.attr({
                        text: a.labelFormat ? F(a.labelFormat, c, this.chart) : a.labelFormatter.call(c)
                    })
                };
                c.prototype.renderItem = function (c) {
                    var a = this.chart,
                        e = a.renderer,
                        f = this.options,
                        d = this.symbolWidth,
                        k = f.symbolPadding,
                        h = this.itemStyle,
                        m = this.itemHiddenStyle,
                        g = "horizontal" === f.layout ?
                        u(f.itemDistance, 20) : 0,
                        q = !f.rtl,
                        K = c.legendItem,
                        n = !c.series,
                        b = !n && c.series.drawLegendSymbol ? c.series : c,
                        C = b.options;
                    C = this.createCheckboxForItem && C && C.showCheckbox;
                    g = d + k + g + (C ? 20 : 0);
                    var w = f.useHTML,
                        R = c.options.className;
                    K || (c.legendGroup = e.g("legend-item").addClass("highcharts-" + b.type + "-series highcharts-color-" + c.colorIndex + (R ? " " + R : "") + (n ? " highcharts-series-" + c.index : "")).attr({
                        zIndex: 1
                    }).add(this.scrollGroup), c.legendItem = K = e.text("", q ? d + k : -k, this.baseline || 0, w), a.styledMode || K.css(y(c.visible ?
                        h : m)), K.attr({
                        align: q ? "left" : "right",
                        zIndex: 2
                    }).add(c.legendGroup), this.baseline || (this.fontMetrics = e.fontMetrics(a.styledMode ? 12 : h.fontSize, K), this.baseline = this.fontMetrics.f + 3 + this.itemMarginTop, K.attr("y", this.baseline)), this.symbolHeight = f.symbolHeight || this.fontMetrics.f, b.drawLegendSymbol(this, c), this.setItemEvents && this.setItemEvents(c, K, w));
                    C && !c.checkbox && this.createCheckboxForItem && this.createCheckboxForItem(c);
                    this.colorizeItem(c, c.visible);
                    !a.styledMode && h.width || K.css({
                        width: (f.itemWidth ||
                            this.widthOption || a.spacingBox.width) - g
                    });
                    this.setText(c);
                    a = K.getBBox();
                    c.itemWidth = c.checkboxOffset = f.itemWidth || c.legendItemWidth || a.width + g;
                    this.maxItemWidth = Math.max(this.maxItemWidth, c.itemWidth);
                    this.totalItemWidth += c.itemWidth;
                    this.itemHeight = c.itemHeight = Math.round(c.legendItemHeight || a.height || this.symbolHeight)
                };
                c.prototype.layoutItem = function (c) {
                    var a = this.options,
                        e = this.padding,
                        f = "horizontal" === a.layout,
                        d = c.itemHeight,
                        k = this.itemMarginBottom,
                        h = this.itemMarginTop,
                        m = f ? u(a.itemDistance, 20) :
                        0,
                        g = this.maxLegendWidth;
                    a = a.alignColumns && this.totalItemWidth > g ? this.maxItemWidth : c.itemWidth;
                    f && this.itemX - e + a > g && (this.itemX = e, this.lastLineHeight && (this.itemY += h + this.lastLineHeight + k), this.lastLineHeight = 0);
                    this.lastItemY = h + this.itemY + k;
                    this.lastLineHeight = Math.max(d, this.lastLineHeight);
                    c._legendItemPos = [this.itemX, this.itemY];
                    f ? this.itemX += a : (this.itemY += h + d + k, this.lastLineHeight = d);
                    this.offsetWidth = this.widthOption || Math.max((f ? this.itemX - e - (c.checkbox ? 0 : m) : a) + e, this.offsetWidth)
                };
                c.prototype.getAllItems =
                    function () {
                        var c = [];
                        this.chart.series.forEach(function (a) {
                            var e = a && a.options;
                            a && u(e.showInLegend, J(e.linkedTo) ? !1 : void 0, !0) && (c = c.concat(a.legendItems || ("point" === e.legendType ? a.data : a)))
                        });
                        A(this, "afterGetAllItems", {
                            allItems: c
                        });
                        return c
                    };
                c.prototype.getAlignment = function () {
                    var c = this.options;
                    return this.proximate ? c.align.charAt(0) + "tv" : c.floating ? "" : c.align.charAt(0) + c.verticalAlign.charAt(0) + c.layout.charAt(0)
                };
                c.prototype.adjustMargins = function (c, a) {
                    var e = this.chart,
                        d = this.options,
                        k = this.getAlignment();
                    k && [/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/].forEach(function (l, h) {
                        l.test(k) && !J(c[h]) && (e[f[h]] = Math.max(e[f[h]], e.legend[(h + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][h] * d[h % 2 ? "x" : "y"] + u(d.margin, 12) + a[h] + (e.titleOffset[h] || 0)))
                    })
                };
                c.prototype.proximatePositions = function () {
                    var c = this.chart,
                        a = [],
                        f = "left" === this.options.align;
                    this.allItems.forEach(function (e) {
                        var d = f;
                        if (e.yAxis && e.points) {
                            e.xAxis.options.reversed && (d = !d);
                            var k = E(d ? e.points : e.points.slice(0).reverse(), function (a) {
                                return L(a.plotY)
                            });
                            d = this.itemMarginTop + e.legendItem.getBBox().height + this.itemMarginBottom;
                            var l = e.yAxis.top - c.plotTop;
                            e.visible ? (k = k ? k.plotY : e.yAxis.height, k += l - .3 * d) : k = l + e.yAxis.height;
                            a.push({
                                target: k,
                                size: d,
                                item: e
                            })
                        }
                    }, this);
                    d.distribute(a, c.plotHeight);
                    a.forEach(function (a) {
                        a.item._legendItemPos[1] = c.plotTop - c.spacing[0] + a.pos
                    })
                };
                c.prototype.render = function () {
                    var c = this.chart,
                        a = c.renderer,
                        f = this.group,
                        d, k = this.box,
                        h = this.options,
                        m = this.padding;
                    this.itemX = m;
                    this.itemY = this.initialItemY;
                    this.lastItemY = this.offsetWidth =
                        0;
                    this.widthOption = D(h.width, c.spacingBox.width - m);
                    var g = c.spacingBox.width - 2 * m - h.x; - 1 < ["rm", "lm"].indexOf(this.getAlignment().substring(0, 2)) && (g /= 2);
                    this.maxLegendWidth = this.widthOption || g;
                    f || (this.group = f = a.g("legend").attr({
                        zIndex: 7
                    }).add(), this.contentGroup = a.g().attr({
                        zIndex: 1
                    }).add(f), this.scrollGroup = a.g().add(this.contentGroup));
                    this.renderTitle();
                    g = this.getAllItems();
                    N(g, function (a, c) {
                        return (a.options && a.options.legendIndex || 0) - (c.options && c.options.legendIndex || 0)
                    });
                    h.reversed && g.reverse();
                    this.allItems = g;
                    this.display = d = !!g.length;
                    this.itemHeight = this.totalItemWidth = this.maxItemWidth = this.lastLineHeight = 0;
                    g.forEach(this.renderItem, this);
                    g.forEach(this.layoutItem, this);
                    g = (this.widthOption || this.offsetWidth) + m;
                    var q = this.lastItemY + this.lastLineHeight + this.titleHeight;
                    q = this.handleOverflow(q);
                    q += m;
                    k || (this.box = k = a.rect().addClass("highcharts-legend-box").attr({
                        r: h.borderRadius
                    }).add(f), k.isNew = !0);
                    c.styledMode || k.attr({
                        stroke: h.borderColor,
                        "stroke-width": h.borderWidth || 0,
                        fill: h.backgroundColor ||
                            "none"
                    }).shadow(h.shadow);
                    0 < g && 0 < q && (k[k.isNew ? "attr" : "animate"](k.crisp.call({}, {
                        x: 0,
                        y: 0,
                        width: g,
                        height: q
                    }, k.strokeWidth())), k.isNew = !1);
                    k[d ? "show" : "hide"]();
                    c.styledMode && "none" === f.getStyle("display") && (g = q = 0);
                    this.legendWidth = g;
                    this.legendHeight = q;
                    d && (a = c.spacingBox, k = a.y, /(lth|ct|rth)/.test(this.getAlignment()) && 0 < c.titleOffset[0] ? k += c.titleOffset[0] : /(lbh|cb|rbh)/.test(this.getAlignment()) && 0 < c.titleOffset[2] && (k -= c.titleOffset[2]), k !== a.y && (a = y(a, {
                        y: k
                    })), f.align(y(h, {
                        width: g,
                        height: q,
                        verticalAlign: this.proximate ?
                            "top" : h.verticalAlign
                    }), !0, a));
                    this.proximate || this.positionItems();
                    A(this, "afterRender")
                };
                c.prototype.handleOverflow = function (c) {
                    var a = this,
                        e = this.chart,
                        f = e.renderer,
                        d = this.options,
                        k = d.y,
                        h = this.padding;
                    k = e.spacingBox.height + ("top" === d.verticalAlign ? -k : k) - h;
                    var m = d.maxHeight,
                        g, q = this.clipRect,
                        y = d.navigation,
                        n = u(y.animation, !0),
                        b = y.arrowSize || 12,
                        C = this.nav,
                        w = this.pages,
                        R, O = this.allItems,
                        v = function (b) {
                            "number" === typeof b ? q.attr({
                                height: b
                            }) : q && (a.clipRect = q.destroy(), a.contentGroup.clip());
                            a.contentGroup.div &&
                                (a.contentGroup.div.style.clip = b ? "rect(" + h + "px,9999px," + (h + b) + "px,0)" : "auto")
                        },
                        D = function (c) {
                            a[c] = f.circle(0, 0, 1.3 * b).translate(b / 2, b / 2).add(C);
                            e.styledMode || a[c].attr("fill", "rgba(0,0,0,0.0001)");
                            return a[c]
                        };
                    "horizontal" !== d.layout || "middle" === d.verticalAlign || d.floating || (k /= 2);
                    m && (k = Math.min(k, m));
                    w.length = 0;
                    c > k && !1 !== y.enabled ? (this.clipHeight = g = Math.max(k - 20 - this.titleHeight - h, 0), this.currentPage = u(this.currentPage, 1), this.fullHeight = c, O.forEach(function (b, a) {
                        var c = b._legendItemPos[1],
                            e = Math.round(b.legendItem.getBBox().height),
                            f = w.length;
                        if (!f || c - w[f - 1] > g && (R || c) !== w[f - 1]) w.push(R || c), f++;
                        b.pageIx = f - 1;
                        R && (O[a - 1].pageIx = f - 1);
                        a === O.length - 1 && c + e - w[f - 1] > g && c !== R && (w.push(c), b.pageIx = f);
                        c !== R && (R = c)
                    }), q || (q = a.clipRect = f.clipRect(0, h, 9999, 0), a.contentGroup.clip(q)), v(g), C || (this.nav = C = f.g().attr({
                            zIndex: 1
                        }).add(this.group), this.up = f.symbol("triangle", 0, 0, b, b).add(C), D("upTracker").on("click", function () {
                            a.scroll(-1, n)
                        }), this.pager = f.text("", 15, 10).addClass("highcharts-legend-navigation"), e.styledMode || this.pager.css(y.style),
                        this.pager.add(C), this.down = f.symbol("triangle-down", 0, 0, b, b).add(C), D("downTracker").on("click", function () {
                            a.scroll(1, n)
                        })), a.scroll(0), c = k) : C && (v(), this.nav = C.destroy(), this.scrollGroup.attr({
                        translateY: 1
                    }), this.clipHeight = 0);
                    return c
                };
                c.prototype.scroll = function (c, a) {
                    var e = this,
                        f = this.chart,
                        k = this.pages,
                        m = k.length,
                        g = this.currentPage + c;
                    c = this.clipHeight;
                    var y = this.options.navigation,
                        v = this.pager,
                        I = this.padding;
                    g > m && (g = m);
                    0 < g && ("undefined" !== typeof a && h(a, f), this.nav.attr({
                        translateX: I,
                        translateY: c +
                            this.padding + 7 + this.titleHeight,
                        visibility: "visible"
                    }), [this.up, this.upTracker].forEach(function (a) {
                        a.attr({
                            "class": 1 === g ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                        })
                    }), v.attr({
                        text: g + "/" + m
                    }), [this.down, this.downTracker].forEach(function (a) {
                        a.attr({
                            x: 18 + this.pager.getBBox().width,
                            "class": g === m ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                        })
                    }, this), f.styledMode || (this.up.attr({
                        fill: 1 === g ? y.inactiveColor : y.activeColor
                    }), this.upTracker.css({
                        cursor: 1 === g ? "default" : "pointer"
                    }), this.down.attr({
                        fill: g === m ? y.inactiveColor : y.activeColor
                    }), this.downTracker.css({
                        cursor: g === m ? "default" : "pointer"
                    })), this.scrollOffset = -k[g - 1] + this.initialItemY, this.scrollGroup.animate({
                        translateY: this.scrollOffset
                    }), this.currentPage = g, this.positionCheckboxes(), a = d.animObject(u(a, f.renderer.globalAnimation, !0)), q(function () {
                        A(e, "afterScroll", {
                            currentPage: g
                        })
                    }, a.duration || 0))
                };
                return c
            }();
        (/Trident\/7\.0/.test(c.navigator && c.navigator.userAgent) || P) && g(k.prototype, "positionItem", function (c,
            e) {
            var a = this,
                f = function () {
                    e._legendItemPos && c.call(a, e)
                };
            f();
            a.bubbleLegend || setTimeout(f)
        });
        d.Legend = k;
        return d.Legend
    });
    S(r, "parts/Chart.js", [r["parts/Globals.js"], r["parts/Legend.js"], r["parts/MSPointer.js"], r["parts/Pointer.js"], r["parts/Time.js"], r["parts/Utilities.js"]], function (d, g, r, v, J, M) {
        var E = M.addEvent,
            A = M.animate,
            F = M.animObject,
            L = M.attr,
            y = M.createElement,
            u = M.css,
            D = M.defined,
            h = M.discardElement,
            N = M.erase,
            q = M.error,
            P = M.extend,
            f = M.find,
            c = M.fireEvent,
            k = M.getStyle,
            m = M.isArray,
            e = M.isFunction,
            a = M.isNumber,
            l = M.isObject,
            t = M.isString,
            z = M.merge,
            x = M.numberFormat,
            B = M.objectEach,
            H = M.pick,
            Q = M.pInt,
            I = M.relativeLength,
            K = M.removeEvent,
            n = M.setAnimation,
            b = M.splat,
            C = M.syncTimeout,
            w = M.uniqueKey,
            R = d.doc,
            O = d.Axis,
            X = d.defaultOptions,
            U = d.charts,
            p = d.marginNames,
            T = d.seriesTypes,
            Z = d.win,
            ca = d.Chart = function () {
                this.getArgs.apply(this, arguments)
            };
        d.chart = function (b, a, c) {
            return new ca(b, a, c)
        };
        P(ca.prototype, {
            callbacks: [],
            getArgs: function () {
                var b = [].slice.call(arguments);
                if (t(b[0]) || b[0].nodeName) this.renderTo =
                    b.shift();
                this.init(b[0], b[1])
            },
            init: function (b, a) {
                var f, k = b.series,
                    h = b.plotOptions || {};
                c(this, "init", {
                    args: arguments
                }, function () {
                    b.series = null;
                    f = z(X, b);
                    B(f.plotOptions, function (b, a) {
                        l(b) && (b.tooltip = h[a] && z(h[a].tooltip) || void 0)
                    });
                    f.tooltip.userOptions = b.chart && b.chart.forExport && b.tooltip.userOptions || b.tooltip;
                    f.series = b.series = k;
                    this.userOptions = b;
                    var m = f.chart,
                        w = m.events;
                    this.margin = [];
                    this.spacing = [];
                    this.bounds = {
                        h: {},
                        v: {}
                    };
                    this.labelCollectors = [];
                    this.callback = a;
                    this.isResizing = 0;
                    this.options =
                        f;
                    this.axes = [];
                    this.series = [];
                    this.time = b.time && Object.keys(b.time).length ? new J(b.time) : d.time;
                    this.numberFormatter = m.numberFormatter || x;
                    this.styledMode = m.styledMode;
                    this.hasCartesianSeries = m.showAxes;
                    var p = this;
                    p.index = U.length;
                    U.push(p);
                    d.chartCount++;
                    w && B(w, function (b, a) {
                        e(b) && E(p, a, b)
                    });
                    p.xAxis = [];
                    p.yAxis = [];
                    p.pointCount = p.colorCounter = p.symbolCounter = 0;
                    c(p, "afterInit");
                    p.firstRender()
                })
            },
            initSeries: function (b) {
                var a = this.options.chart;
                a = b.type || a.type || a.defaultSeriesType;
                var c = T[a];
                c || q(17,
                    !0, this, {
                        missingModuleFor: a
                    });
                a = new c;
                a.init(this, b);
                return a
            },
            setSeriesData: function () {
                this.getSeriesOrderByLinks().forEach(function (b) {
                    b.points || b.data || !b.enabledDataSorting || b.setData(b.options.data, !1)
                })
            },
            getSeriesOrderByLinks: function () {
                return this.series.concat().sort(function (b, a) {
                    return b.linkedSeries.length || a.linkedSeries.length ? a.linkedSeries.length - b.linkedSeries.length : 0
                })
            },
            orderSeries: function (b) {
                var a = this.series;
                for (b = b || 0; b < a.length; b++) a[b] && (a[b].index = b, a[b].name = a[b].getName())
            },
            isInsidePlot: function (b, a, e) {
                var f = e ? a : b;
                b = e ? b : a;
                f = {
                    x: f,
                    y: b,
                    isInsidePlot: 0 <= f && f <= this.plotWidth && 0 <= b && b <= this.plotHeight
                };
                c(this, "afterIsInsidePlot", f);
                return f.isInsidePlot
            },
            redraw: function (b) {
                c(this, "beforeRedraw");
                var a = this.axes,
                    e = this.series,
                    f = this.pointer,
                    d = this.legend,
                    k = this.userOptions.legend,
                    h = this.isDirtyLegend,
                    l = this.hasCartesianSeries,
                    m = this.isDirtyBox,
                    p = this.renderer,
                    w = p.isHidden(),
                    g = [];
                this.setResponsive && this.setResponsive(!1);
                n(this.hasRendered ? b : !1, this);
                w && this.temporaryDisplay();
                this.layOutTitles();
                for (b = e.length; b--;) {
                    var C = e[b];
                    if (C.options.stacking) {
                        var x = !0;
                        if (C.isDirty) {
                            var t = !0;
                            break
                        }
                    }
                }
                if (t)
                    for (b = e.length; b--;) C = e[b], C.options.stacking && (C.isDirty = !0);
                e.forEach(function (b) {
                    b.isDirty && ("point" === b.options.legendType ? (b.updateTotals && b.updateTotals(), h = !0) : k && (k.labelFormatter || k.labelFormat) && (h = !0));
                    b.isDirtyData && c(b, "updatedData")
                });
                h && d && d.options.enabled && (d.render(), this.isDirtyLegend = !1);
                x && this.getStacks();
                l && a.forEach(function (b) {
                    b.updateNames();
                    b.setScale()
                });
                this.getMargins();
                l && (a.forEach(function (b) {
                    b.isDirty && (m = !0)
                }), a.forEach(function (b) {
                    var a = b.min + "," + b.max;
                    b.extKey !== a && (b.extKey = a, g.push(function () {
                        c(b, "afterSetExtremes", P(b.eventArgs, b.getExtremes()));
                        delete b.eventArgs
                    }));
                    (m || x) && b.redraw()
                }));
                m && this.drawChartBox();
                c(this, "predraw");
                e.forEach(function (b) {
                    (m || b.isDirty) && b.visible && b.redraw();
                    b.isDirtyData = !1
                });
                f && f.reset(!0);
                p.draw();
                c(this, "redraw");
                c(this, "render");
                w && this.temporaryDisplay(!0);
                g.forEach(function (b) {
                    b.call()
                })
            },
            get: function (b) {
                function a(a) {
                    return a.id ===
                        b || a.options && a.options.id === b
                }
                var c = this.series,
                    e;
                var d = f(this.axes, a) || f(this.series, a);
                for (e = 0; !d && e < c.length; e++) d = f(c[e].points || [], a);
                return d
            },
            getAxes: function () {
                var a = this,
                    e = this.options,
                    f = e.xAxis = b(e.xAxis || {});
                e = e.yAxis = b(e.yAxis || {});
                c(this, "getAxes");
                f.forEach(function (b, a) {
                    b.index = a;
                    b.isX = !0
                });
                e.forEach(function (b, a) {
                    b.index = a
                });
                f.concat(e).forEach(function (b) {
                    new O(a, b)
                });
                c(this, "afterGetAxes")
            },
            getSelectedPoints: function () {
                var b = [];
                this.series.forEach(function (a) {
                    b = b.concat(a.getPointsCollection().filter(function (b) {
                        return H(b.selectedStaging,
                            b.selected)
                    }))
                });
                return b
            },
            getSelectedSeries: function () {
                return this.series.filter(function (b) {
                    return b.selected
                })
            },
            setTitle: function (b, a, c) {
                this.applyDescription("title", b);
                this.applyDescription("subtitle", a);
                this.applyDescription("caption", void 0);
                this.layOutTitles(c)
            },
            applyDescription: function (b, a) {
                var c = this,
                    e = "title" === b ? {
                        color: "#333333",
                        fontSize: this.options.isStock ? "16px" : "18px"
                    } : {
                        color: "#666666"
                    };
                e = this.options[b] = z(!this.styledMode && {
                    style: e
                }, this.options[b], a);
                var f = this[b];
                f && a && (this[b] =
                    f = f.destroy());
                e && !f && (f = this.renderer.text(e.text, 0, 0, e.useHTML).attr({
                    align: e.align,
                    "class": "highcharts-" + b,
                    zIndex: e.zIndex || 4
                }).add(), f.update = function (a) {
                    c[{
                        title: "setTitle",
                        subtitle: "setSubtitle",
                        caption: "setCaption"
                    } [b]](a)
                }, this.styledMode || f.css(e.style), this[b] = f)
            },
            layOutTitles: function (b) {
                var a = [0, 0, 0],
                    e = this.renderer,
                    f = this.spacingBox;
                ["title", "subtitle", "caption"].forEach(function (b) {
                    var c = this[b],
                        d = this.options[b],
                        k = d.verticalAlign || "top";
                    b = "title" === b ? -3 : "top" === k ? a[0] + 2 : 0;
                    if (c) {
                        if (!this.styledMode) var h =
                            d.style.fontSize;
                        h = e.fontMetrics(h, c).b;
                        c.css({
                            width: (d.width || f.width + (d.widthAdjust || 0)) + "px"
                        });
                        var l = Math.round(c.getBBox(d.useHTML).height);
                        c.align(P({
                            y: "bottom" === k ? h : b + h,
                            height: l
                        }, d), !1, "spacingBox");
                        d.floating || ("top" === k ? a[0] = Math.ceil(a[0] + l) : "bottom" === k && (a[2] = Math.ceil(a[2] + l)))
                    }
                }, this);
                a[0] && "top" === (this.options.title.verticalAlign || "top") && (a[0] += this.options.title.margin);
                a[2] && "bottom" === this.options.caption.verticalAlign && (a[2] += this.options.caption.margin);
                var d = !this.titleOffset ||
                    this.titleOffset.join(",") !== a.join(",");
                this.titleOffset = a;
                c(this, "afterLayOutTitles");
                !this.isDirtyBox && d && (this.isDirtyBox = this.isDirtyLegend = d, this.hasRendered && H(b, !0) && this.isDirtyBox && this.redraw())
            },
            getChartSize: function () {
                var b = this.options.chart,
                    a = b.width;
                b = b.height;
                var c = this.renderTo;
                D(a) || (this.containerWidth = k(c, "width"));
                D(b) || (this.containerHeight = k(c, "height"));
                this.chartWidth = Math.max(0, a || this.containerWidth || 600);
                this.chartHeight = Math.max(0, I(b, this.chartWidth) || (1 < this.containerHeight ?
                    this.containerHeight : 400))
            },
            temporaryDisplay: function (b) {
                var a = this.renderTo;
                if (b)
                    for (; a && a.style;) a.hcOrigStyle && (u(a, a.hcOrigStyle), delete a.hcOrigStyle), a.hcOrigDetached && (R.body.removeChild(a), a.hcOrigDetached = !1), a = a.parentNode;
                else
                    for (; a && a.style;) {
                        R.body.contains(a) || a.parentNode || (a.hcOrigDetached = !0, R.body.appendChild(a));
                        if ("none" === k(a, "display", !1) || a.hcOricDetached) a.hcOrigStyle = {
                                display: a.style.display,
                                height: a.style.height,
                                overflow: a.style.overflow
                            }, b = {
                                display: "block",
                                overflow: "hidden"
                            },
                            a !== this.renderTo && (b.height = 0), u(a, b), a.offsetWidth || a.style.setProperty("display", "block", "important");
                        a = a.parentNode;
                        if (a === R.body) break
                    }
            },
            setClassName: function (b) {
                this.container.className = "highcharts-container " + (b || "")
            },
            getContainer: function () {
                var b = this.options,
                    e = b.chart;
                var f = this.renderTo;
                var k = w(),
                    h, l;
                f || (this.renderTo = f = e.renderTo);
                t(f) && (this.renderTo = f = R.getElementById(f));
                f || q(13, !0, this);
                var m = Q(L(f, "data-highcharts-chart"));
                a(m) && U[m] && U[m].hasRendered && U[m].destroy();
                L(f, "data-highcharts-chart",
                    this.index);
                f.innerHTML = "";
                e.skipClone || f.offsetWidth || this.temporaryDisplay();
                this.getChartSize();
                m = this.chartWidth;
                var p = this.chartHeight;
                u(f, {
                    overflow: "hidden"
                });
                this.styledMode || (h = P({
                    position: "relative",
                    overflow: "hidden",
                    width: m + "px",
                    height: p + "px",
                    textAlign: "left",
                    lineHeight: "normal",
                    zIndex: 0,
                    "-webkit-tap-highlight-color": "rgba(0,0,0,0)"
                }, e.style));
                this.container = f = y("div", {
                    id: k
                }, h, f);
                this._cursor = f.style.cursor;
                this.renderer = new(d[e.renderer] || d.Renderer)(f, m, p, null, e.forExport, b.exporting &&
                    b.exporting.allowHTML, this.styledMode);
                n(void 0, this);
                this.setClassName(e.className);
                if (this.styledMode)
                    for (l in b.defs) this.renderer.definition(b.defs[l]);
                else this.renderer.setStyle(e.style);
                this.renderer.chartIndex = this.index;
                c(this, "afterGetContainer")
            },
            getMargins: function (b) {
                var a = this.spacing,
                    e = this.margin,
                    f = this.titleOffset;
                this.resetMargins();
                f[0] && !D(e[0]) && (this.plotTop = Math.max(this.plotTop, f[0] + a[0]));
                f[2] && !D(e[2]) && (this.marginBottom = Math.max(this.marginBottom, f[2] + a[2]));
                this.legend &&
                    this.legend.display && this.legend.adjustMargins(e, a);
                c(this, "getMargins");
                b || this.getAxisMargins()
            },
            getAxisMargins: function () {
                var b = this,
                    a = b.axisOffset = [0, 0, 0, 0],
                    c = b.colorAxis,
                    e = b.margin,
                    f = function (b) {
                        b.forEach(function (b) {
                            b.visible && b.getOffset()
                        })
                    };
                b.hasCartesianSeries ? f(b.axes) : c && c.length && f(c);
                p.forEach(function (c, f) {
                    D(e[f]) || (b[c] += a[f])
                });
                b.setChartSize()
            },
            reflow: function (b) {
                var a = this,
                    c = a.options.chart,
                    e = a.renderTo,
                    f = D(c.width) && D(c.height),
                    d = c.width || k(e, "width");
                c = c.height || k(e, "height");
                e = b ? b.target : Z;
                if (!f && !a.isPrinting && d && c && (e === Z || e === R)) {
                    if (d !== a.containerWidth || c !== a.containerHeight) M.clearTimeout(a.reflowTimeout), a.reflowTimeout = C(function () {
                        a.container && a.setSize(void 0, void 0, !1)
                    }, b ? 100 : 0);
                    a.containerWidth = d;
                    a.containerHeight = c
                }
            },
            setReflow: function (b) {
                var a = this;
                !1 === b || this.unbindReflow ? !1 === b && this.unbindReflow && (this.unbindReflow = this.unbindReflow()) : (this.unbindReflow = E(Z, "resize", function (b) {
                    a.options && a.reflow(b)
                }), E(this, "destroy", this.unbindReflow))
            },
            setSize: function (b,
                a, e) {
                var f = this,
                    d = f.renderer;
                f.isResizing += 1;
                n(e, f);
                f.oldChartHeight = f.chartHeight;
                f.oldChartWidth = f.chartWidth;
                "undefined" !== typeof b && (f.options.chart.width = b);
                "undefined" !== typeof a && (f.options.chart.height = a);
                f.getChartSize();
                if (!f.styledMode) {
                    var k = d.globalAnimation;
                    (k ? A : u)(f.container, {
                        width: f.chartWidth + "px",
                        height: f.chartHeight + "px"
                    }, k)
                }
                f.setChartSize(!0);
                d.setSize(f.chartWidth, f.chartHeight, e);
                f.axes.forEach(function (b) {
                    b.isDirty = !0;
                    b.setScale()
                });
                f.isDirtyLegend = !0;
                f.isDirtyBox = !0;
                f.layOutTitles();
                f.getMargins();
                f.redraw(e);
                f.oldChartHeight = null;
                c(f, "resize");
                C(function () {
                    f && c(f, "endResize", null, function () {
                        --f.isResizing
                    })
                }, F(k).duration || 0)
            },
            setChartSize: function (b) {
                var a = this.inverted,
                    f = this.renderer,
                    e = this.chartWidth,
                    d = this.chartHeight,
                    k = this.options.chart,
                    h = this.spacing,
                    l = this.clipOffset,
                    m, p, w, n;
                this.plotLeft = m = Math.round(this.plotLeft);
                this.plotTop = p = Math.round(this.plotTop);
                this.plotWidth = w = Math.max(0, Math.round(e - m - this.marginRight));
                this.plotHeight = n = Math.max(0, Math.round(d - p - this.marginBottom));
                this.plotSizeX = a ? n : w;
                this.plotSizeY = a ? w : n;
                this.plotBorderWidth = k.plotBorderWidth || 0;
                this.spacingBox = f.spacingBox = {
                    x: h[3],
                    y: h[0],
                    width: e - h[3] - h[1],
                    height: d - h[0] - h[2]
                };
                this.plotBox = f.plotBox = {
                    x: m,
                    y: p,
                    width: w,
                    height: n
                };
                e = 2 * Math.floor(this.plotBorderWidth / 2);
                a = Math.ceil(Math.max(e, l[3]) / 2);
                f = Math.ceil(Math.max(e, l[0]) / 2);
                this.clipBox = {
                    x: a,
                    y: f,
                    width: Math.floor(this.plotSizeX - Math.max(e, l[1]) / 2 - a),
                    height: Math.max(0, Math.floor(this.plotSizeY - Math.max(e, l[2]) / 2 - f))
                };
                b || this.axes.forEach(function (b) {
                    b.setAxisSize();
                    b.setAxisTranslation()
                });
                c(this, "afterSetChartSize", {
                    skipAxes: b
                })
            },
            resetMargins: function () {
                c(this, "resetMargins");
                var b = this,
                    a = b.options.chart;
                ["margin", "spacing"].forEach(function (c) {
                    var f = a[c],
                        e = l(f) ? f : [f, f, f, f];
                    ["Top", "Right", "Bottom", "Left"].forEach(function (f, d) {
                        b[c][d] = H(a[c + f], e[d])
                    })
                });
                p.forEach(function (a, c) {
                    b[a] = H(b.margin[c], b.spacing[c])
                });
                b.axisOffset = [0, 0, 0, 0];
                b.clipOffset = [0, 0, 0, 0]
            },
            drawChartBox: function () {
                var b = this.options.chart,
                    a = this.renderer,
                    f = this.chartWidth,
                    e = this.chartHeight,
                    d = this.chartBackground,
                    k = this.plotBackground,
                    h = this.plotBorder,
                    l = this.styledMode,
                    m = this.plotBGImage,
                    p = b.backgroundColor,
                    w = b.plotBackgroundColor,
                    n = b.plotBackgroundImage,
                    g, C = this.plotLeft,
                    x = this.plotTop,
                    t = this.plotWidth,
                    q = this.plotHeight,
                    u = this.plotBox,
                    B = this.clipRect,
                    z = this.clipBox,
                    O = "animate";
                d || (this.chartBackground = d = a.rect().addClass("highcharts-background").add(), O = "attr");
                if (l) var y = g = d.strokeWidth();
                else {
                    y = b.borderWidth || 0;
                    g = y + (b.shadow ? 8 : 0);
                    p = {
                        fill: p || "none"
                    };
                    if (y || d["stroke-width"]) p.stroke =
                        b.borderColor, p["stroke-width"] = y;
                    d.attr(p).shadow(b.shadow)
                }
                d[O]({
                    x: g / 2,
                    y: g / 2,
                    width: f - g - y % 2,
                    height: e - g - y % 2,
                    r: b.borderRadius
                });
                O = "animate";
                k || (O = "attr", this.plotBackground = k = a.rect().addClass("highcharts-plot-background").add());
                k[O](u);
                l || (k.attr({
                    fill: w || "none"
                }).shadow(b.plotShadow), n && (m ? (n !== m.attr("href") && m.attr("href", n), m.animate(u)) : this.plotBGImage = a.image(n, C, x, t, q).add()));
                B ? B.animate({
                    width: z.width,
                    height: z.height
                }) : this.clipRect = a.clipRect(z);
                O = "animate";
                h || (O = "attr", this.plotBorder =
                    h = a.rect().addClass("highcharts-plot-border").attr({
                        zIndex: 1
                    }).add());
                l || h.attr({
                    stroke: b.plotBorderColor,
                    "stroke-width": b.plotBorderWidth || 0,
                    fill: "none"
                });
                h[O](h.crisp({
                    x: C,
                    y: x,
                    width: t,
                    height: q
                }, -h.strokeWidth()));
                this.isDirtyBox = !1;
                c(this, "afterDrawChartBox")
            },
            propFromSeries: function () {
                var b = this,
                    a = b.options.chart,
                    c, f = b.options.series,
                    e, d;
                ["inverted", "angular", "polar"].forEach(function (k) {
                    c = T[a.type || a.defaultSeriesType];
                    d = a[k] || c && c.prototype[k];
                    for (e = f && f.length; !d && e--;)(c = T[f[e].type]) && c.prototype[k] &&
                        (d = !0);
                    b[k] = d
                })
            },
            linkSeries: function () {
                var b = this,
                    a = b.series;
                a.forEach(function (b) {
                    b.linkedSeries.length = 0
                });
                a.forEach(function (a) {
                    var c = a.options.linkedTo;
                    t(c) && (c = ":previous" === c ? b.series[a.index - 1] : b.get(c)) && c.linkedParent !== a && (c.linkedSeries.push(a), a.linkedParent = c, c.enabledDataSorting && a.setDataSortingOptions(), a.visible = H(a.options.visible, c.options.visible, a.visible))
                });
                c(this, "afterLinkSeries")
            },
            renderSeries: function () {
                this.series.forEach(function (b) {
                    b.translate();
                    b.render()
                })
            },
            renderLabels: function () {
                var b =
                    this,
                    a = b.options.labels;
                a.items && a.items.forEach(function (c) {
                    var f = P(a.style, c.style),
                        e = Q(f.left) + b.plotLeft,
                        d = Q(f.top) + b.plotTop + 12;
                    delete f.left;
                    delete f.top;
                    b.renderer.text(c.html, e, d).attr({
                        zIndex: 2
                    }).css(f).add()
                })
            },
            render: function () {
                var b = this.axes,
                    a = this.colorAxis,
                    c = this.renderer,
                    f = this.options,
                    e = 0,
                    d = function (b) {
                        b.forEach(function (b) {
                            b.visible && b.render()
                        })
                    };
                this.setTitle();
                this.legend = new g(this, f.legend);
                this.getStacks && this.getStacks();
                this.getMargins(!0);
                this.setChartSize();
                f = this.plotWidth;
                b.some(function (b) {
                    if (b.horiz && b.visible && b.options.labels.enabled && b.series.length) return e = 21, !0
                });
                var k = this.plotHeight = Math.max(this.plotHeight - e, 0);
                b.forEach(function (b) {
                    b.setScale()
                });
                this.getAxisMargins();
                var h = 1.1 < f / this.plotWidth;
                var l = 1.05 < k / this.plotHeight;
                if (h || l) b.forEach(function (b) {
                    (b.horiz && h || !b.horiz && l) && b.setTickInterval(!0)
                }), this.getMargins();
                this.drawChartBox();
                this.hasCartesianSeries ? d(b) : a && a.length && d(a);
                this.seriesGroup || (this.seriesGroup = c.g("series-group").attr({
                    zIndex: 3
                }).add());
                this.renderSeries();
                this.renderLabels();
                this.addCredits();
                this.setResponsive && this.setResponsive();
                this.updateContainerScaling();
                this.hasRendered = !0
            },
            addCredits: function (b) {
                var a = this;
                b = z(!0, this.options.credits, b);
                b.enabled && !this.credits && (this.credits = this.renderer.text(b.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function () {
                        b.href && (Z.location.href = b.href)
                    }).attr({
                        align: b.position.align,
                        zIndex: 8
                    }), a.styledMode || this.credits.css(b.style), this.credits.add().align(b.position),
                    this.credits.update = function (b) {
                        a.credits = a.credits.destroy();
                        a.addCredits(b)
                    })
            },
            updateContainerScaling: function () {
                var b = this.container;
                if (b.offsetWidth && b.offsetHeight && b.getBoundingClientRect) {
                    var a = b.getBoundingClientRect(),
                        c = a.width / b.offsetWidth;
                    b = a.height / b.offsetHeight;
                    1 !== c || 1 !== b ? this.containerScaling = {
                        scaleX: c,
                        scaleY: b
                    } : delete this.containerScaling
                }
            },
            destroy: function () {
                var b = this,
                    a = b.axes,
                    f = b.series,
                    e = b.container,
                    k, l = e && e.parentNode;
                c(b, "destroy");
                b.renderer.forExport ? N(U, b) : U[b.index] =
                    void 0;
                d.chartCount--;
                b.renderTo.removeAttribute("data-highcharts-chart");
                K(b);
                for (k = a.length; k--;) a[k] = a[k].destroy();
                this.scroller && this.scroller.destroy && this.scroller.destroy();
                for (k = f.length; k--;) f[k] = f[k].destroy();
                "title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" ").forEach(function (a) {
                    var c = b[a];
                    c && c.destroy && (b[a] = c.destroy())
                });
                e && (e.innerHTML = "", K(e), l && h(e));
                B(b, function (a,
                    c) {
                    delete b[c]
                })
            },
            firstRender: function () {
                var b = this,
                    a = b.options;
                if (!b.isReadyToRender || b.isReadyToRender()) {
                    b.getContainer();
                    b.resetMargins();
                    b.setChartSize();
                    b.propFromSeries();
                    b.getAxes();
                    (m(a.series) ? a.series : []).forEach(function (a) {
                        b.initSeries(a)
                    });
                    b.linkSeries();
                    b.setSeriesData();
                    c(b, "beforeRender");
                    v && (b.pointer = d.hasTouch || !Z.PointerEvent && !Z.MSPointerEvent ? new v(b, a) : new r(b, a));
                    b.render();
                    if (!b.renderer.imgCount && !b.hasLoaded) b.onload();
                    b.temporaryDisplay(!0)
                }
            },
            onload: function () {
                this.callbacks.concat([this.callback]).forEach(function (b) {
                    b &&
                        "undefined" !== typeof this.index && b.apply(this, [this])
                }, this);
                c(this, "load");
                c(this, "render");
                D(this.index) && this.setReflow(this.options.chart.reflow);
                this.hasLoaded = !0
            }
        })
    });
    S(r, "parts/ScrollablePlotArea.js", [r["parts/Globals.js"], r["parts/Utilities.js"]], function (d, g) {
        var r = g.addEvent,
            v = g.createElement,
            J = g.pick,
            M = g.stop;
        g = d.Chart;
        "";
        r(g, "afterSetChartSize", function (g) {
            var v = this.options.chart.scrollablePlotArea,
                r = v && v.minWidth;
            v = v && v.minHeight;
            if (!this.renderer.forExport) {
                if (r) {
                    if (this.scrollablePixelsX =
                        r = Math.max(0, r - this.chartWidth)) {
                        this.plotWidth += r;
                        this.inverted ? (this.clipBox.height += r, this.plotBox.height += r) : (this.clipBox.width += r, this.plotBox.width += r);
                        var E = {
                            1: {
                                name: "right",
                                value: r
                            }
                        }
                    }
                } else v && (this.scrollablePixelsY = r = Math.max(0, v - this.chartHeight)) && (this.plotHeight += r, this.inverted ? (this.clipBox.width += r, this.plotBox.width += r) : (this.clipBox.height += r, this.plotBox.height += r), E = {
                    2: {
                        name: "bottom",
                        value: r
                    }
                });
                E && !g.skipAxes && this.axes.forEach(function (g) {
                    E[g.side] ? g.getPlotLinePath = function () {
                        var u =
                            E[g.side].name,
                            y = this[u];
                        this[u] = y - E[g.side].value;
                        var h = d.Axis.prototype.getPlotLinePath.apply(this, arguments);
                        this[u] = y;
                        return h
                    } : (g.setAxisSize(), g.setAxisTranslation())
                })
            }
        });
        r(g, "render", function () {
            this.scrollablePixelsX || this.scrollablePixelsY ? (this.setUpScrolling && this.setUpScrolling(), this.applyFixed()) : this.fixedDiv && this.applyFixed()
        });
        g.prototype.setUpScrolling = function () {
            var d = this,
                g = {
                    WebkitOverflowScrolling: "touch",
                    overflowX: "hidden",
                    overflowY: "hidden"
                };
            this.scrollablePixelsX && (g.overflowX =
                "auto");
            this.scrollablePixelsY && (g.overflowY = "auto");
            this.scrollingContainer = v("div", {
                className: "highcharts-scrolling"
            }, g, this.renderTo);
            r(this.scrollingContainer, "scroll", function () {
                d.pointer && delete d.pointer.chartPosition
            });
            this.innerContainer = v("div", {
                className: "highcharts-inner-container"
            }, null, this.scrollingContainer);
            this.innerContainer.appendChild(this.container);
            this.setUpScrolling = null
        };
        g.prototype.moveFixedElements = function () {
            var d = this.container,
                g = this.fixedRenderer,
                v = ".highcharts-contextbutton .highcharts-credits .highcharts-legend .highcharts-legend-checkbox .highcharts-navigator-series .highcharts-navigator-xaxis .highcharts-navigator-yaxis .highcharts-navigator .highcharts-reset-zoom .highcharts-scrollbar .highcharts-subtitle .highcharts-title".split(" "),
                r;
            this.scrollablePixelsX && !this.inverted ? r = ".highcharts-yaxis" : this.scrollablePixelsX && this.inverted ? r = ".highcharts-xaxis" : this.scrollablePixelsY && !this.inverted ? r = ".highcharts-xaxis" : this.scrollablePixelsY && this.inverted && (r = ".highcharts-yaxis");
            v.push(r, r + "-labels");
            v.forEach(function (y) {
                [].forEach.call(d.querySelectorAll(y), function (d) {
                    (d.namespaceURI === g.SVG_NS ? g.box : g.box.parentNode).appendChild(d);
                    d.style.pointerEvents = "auto"
                })
            })
        };
        g.prototype.applyFixed = function () {
            var g, A = !this.fixedDiv,
                F = this.options.chart.scrollablePlotArea;
            A ? (this.fixedDiv = v("div", {
                    className: "highcharts-fixed"
                }, {
                    position: "absolute",
                    overflow: "hidden",
                    pointerEvents: "none",
                    zIndex: 2
                }, null, !0), this.renderTo.insertBefore(this.fixedDiv, this.renderTo.firstChild), this.renderTo.style.overflow = "visible", this.fixedRenderer = g = new d.Renderer(this.fixedDiv, this.chartWidth, this.chartHeight), this.scrollableMask = g.path().attr({
                    fill: this.options.chart.backgroundColor || "#fff",
                    "fill-opacity": J(F.opacity, .85),
                    zIndex: -1
                }).addClass("highcharts-scrollable-mask").add(), this.moveFixedElements(),
                r(this, "afterShowResetZoom", this.moveFixedElements), r(this, "afterLayOutTitles", this.moveFixedElements)) : this.fixedRenderer.setSize(this.chartWidth, this.chartHeight);
            g = this.chartWidth + (this.scrollablePixelsX || 0);
            var L = this.chartHeight + (this.scrollablePixelsY || 0);
            M(this.container);
            this.container.style.width = g + "px";
            this.container.style.height = L + "px";
            this.renderer.boxWrapper.attr({
                width: g,
                height: L,
                viewBox: [0, 0, g, L].join(" ")
            });
            this.chartBackground.attr({
                width: g,
                height: L
            });
            this.scrollablePixelsY && (this.scrollingContainer.style.height =
                this.chartHeight + "px");
            A && (F.scrollPositionX && (this.scrollingContainer.scrollLeft = this.scrollablePixelsX * F.scrollPositionX), F.scrollPositionY && (this.scrollingContainer.scrollTop = this.scrollablePixelsY * F.scrollPositionY));
            L = this.axisOffset;
            A = this.plotTop - L[0] - 1;
            F = this.plotLeft - L[3] - 1;
            g = this.plotTop + this.plotHeight + L[2] + 1;
            L = this.plotLeft + this.plotWidth + L[1] + 1;
            var y = this.plotLeft + this.plotWidth - (this.scrollablePixelsX || 0),
                u = this.plotTop + this.plotHeight - (this.scrollablePixelsY || 0);
            A = this.scrollablePixelsX ? ["M", 0, A, "L", this.plotLeft - 1, A, "L", this.plotLeft - 1, g, "L", 0, g, "Z", "M", y, A, "L", this.chartWidth, A, "L", this.chartWidth, g, "L", y, g, "Z"] : this.scrollablePixelsY ? ["M", F, 0, "L", F, this.plotTop - 1, "L", L, this.plotTop - 1, "L", L, 0, "Z", "M", F, u, "L", F, this.chartHeight, "L", L, this.chartHeight, "L", L, u, "Z"] : ["M", 0, 0];
            "adjustHeight" !== this.redrawTrigger && this.scrollableMask.attr({
                d: A
            })
        }
    });
    S(r, "mixins/legend-symbol.js", [r["parts/Globals.js"], r["parts/Utilities.js"]], function (d, g) {
        var r = g.merge,
            v = g.pick;
        d.LegendSymbolMixin = {
            drawRectangle: function (d,
                g) {
                var r = d.symbolHeight,
                    A = d.options.squareSymbol;
                g.legendSymbol = this.chart.renderer.rect(A ? (d.symbolWidth - r) / 2 : 0, d.baseline - r + 1, A ? r : d.symbolWidth, r, v(d.options.symbolRadius, r / 2)).addClass("highcharts-point").attr({
                    zIndex: 3
                }).add(g.legendGroup)
            },
            drawLineMarker: function (d) {
                var g = this.options,
                    E = g.marker,
                    A = d.symbolWidth,
                    F = d.symbolHeight,
                    L = F / 2,
                    y = this.chart.renderer,
                    u = this.legendGroup;
                d = d.baseline - Math.round(.3 * d.fontMetrics.b);
                var D = {};
                this.chart.styledMode || (D = {
                        "stroke-width": g.lineWidth || 0
                    }, g.dashStyle &&
                    (D.dashstyle = g.dashStyle));
                this.legendLine = y.path(["M", 0, d, "L", A, d]).addClass("highcharts-graph").attr(D).add(u);
                E && !1 !== E.enabled && A && (g = Math.min(v(E.radius, L), L), 0 === this.symbol.indexOf("url") && (E = r(E, {
                    width: F,
                    height: F
                }), g = 0), this.legendSymbol = E = y.symbol(this.symbol, A / 2 - g, d - g, 2 * g, 2 * g, E).addClass("highcharts-point").add(u), E.isMarker = !0)
            }
        };
        return d.LegendSymbolMixin
    });
    S(r, "parts/Point.js", [r["parts/Globals.js"], r["parts/Utilities.js"]], function (d, g) {
        "";
        var r = g.animObject,
            v = g.defined,
            J = g.erase,
            M =
            g.extend,
            E = g.format,
            A = g.getNestedProperty,
            F = g.isArray,
            L = g.isNumber,
            y = g.isObject,
            u = g.syncTimeout,
            D = g.pick,
            h = g.removeEvent,
            N = g.uniqueKey,
            q = d.fireEvent;
        g = function () {
            function d() {
                this.colorIndex = this.category = void 0;
                this.formatPrefix = "point";
                this.id = void 0;
                this.isNull = !1;
                this.percentage = this.options = this.name = void 0;
                this.selected = !1;
                this.total = this.series = void 0;
                this.visible = !0;
                this.x = void 0
            }
            d.prototype.animateBeforeDestroy = function () {
                var f = this,
                    c = {
                        x: f.startXPos,
                        opacity: 0
                    },
                    d, h = f.getGraphicalProps();
                h.singular.forEach(function (e) {
                    d =
                        "dataLabel" === e;
                    f[e] = f[e].animate(d ? {
                        x: f[e].startXPos,
                        y: f[e].startYPos,
                        opacity: 0
                    } : c)
                });
                h.plural.forEach(function (c) {
                    f[c].forEach(function (a) {
                        a.element && a.animate(M({
                            x: f.startXPos
                        }, a.startYPos ? {
                            x: a.startXPos,
                            y: a.startYPos
                        } : {}))
                    })
                })
            };
            d.prototype.applyOptions = function (f, c) {
                var k = this.series,
                    h = k.options.pointValKey || k.pointValKey;
                f = d.prototype.optionsToObject.call(this, f);
                M(this, f);
                this.options = this.options ? M(this.options, f) : f;
                f.group && delete this.group;
                f.dataLabels && delete this.dataLabels;
                h && (this.y =
                    d.prototype.getNestedProperty.call(this, h));
                this.formatPrefix = (this.isNull = D(this.isValid && !this.isValid(), null === this.x || !L(this.y))) ? "null" : "point";
                this.selected && (this.state = "select");
                "name" in this && "undefined" === typeof c && k.xAxis && k.xAxis.hasNames && (this.x = k.xAxis.nameToX(this));
                "undefined" === typeof this.x && k && (this.x = "undefined" === typeof c ? k.autoIncrement(this) : c);
                return this
            };
            d.prototype.destroy = function () {
                function f() {
                    if (c.graphic || c.dataLabel || c.dataLabels) h(c), c.destroyElements();
                    for (l in c) c[l] =
                        null
                }
                var c = this,
                    d = c.series,
                    m = d.chart;
                d = d.options.dataSorting;
                var e = m.hoverPoints,
                    a = r(c.series.chart.renderer.globalAnimation),
                    l;
                c.legendItem && m.legend.destroyItem(c);
                e && (c.setState(), J(e, c), e.length || (m.hoverPoints = null));
                if (c === m.hoverPoint) c.onMouseOut();
                d && d.enabled ? (this.animateBeforeDestroy(), u(f, a.duration)) : f();
                m.pointCount--
            };
            d.prototype.destroyElements = function (f) {
                var c = this;
                f = c.getGraphicalProps(f);
                f.singular.forEach(function (f) {
                    c[f] = c[f].destroy()
                });
                f.plural.forEach(function (f) {
                    c[f].forEach(function (c) {
                        c.element &&
                            c.destroy()
                    });
                    delete c[f]
                })
            };
            d.prototype.firePointEvent = function (f, c, d) {
                var k = this,
                    e = this.series.options;
                (e.point.events[f] || k.options && k.options.events && k.options.events[f]) && k.importEvents();
                "click" === f && e.allowPointSelect && (d = function (a) {
                    k.select && k.select(null, a.ctrlKey || a.metaKey || a.shiftKey)
                });
                q(k, f, c, d)
            };
            d.prototype.getClassName = function () {
                return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" : "") +
                    ("undefined" !== typeof this.colorIndex ? " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className : "") + (this.zone && this.zone.className ? " " + this.zone.className.replace("highcharts-negative", "") : "")
            };
            d.prototype.getGraphicalProps = function (f) {
                var c = this,
                    d = [],
                    h, e = {
                        singular: [],
                        plural: []
                    };
                f = f || {
                    graphic: 1,
                    dataLabel: 1
                };
                f.graphic && d.push("graphic", "shadowGroup");
                f.dataLabel && d.push("dataLabel", "dataLabelUpper", "connector");
                for (h = d.length; h--;) {
                    var a = d[h];
                    c[a] && e.singular.push(a)
                } ["dataLabel",
                    "connector"
                ].forEach(function (a) {
                    var d = a + "s";
                    f[a] && c[d] && e.plural.push(d)
                });
                return e
            };
            d.prototype.getLabelConfig = function () {
                return {
                    x: this.category,
                    y: this.y,
                    color: this.color,
                    colorIndex: this.colorIndex,
                    key: this.name || this.category,
                    series: this.series,
                    point: this,
                    percentage: this.percentage,
                    total: this.total || this.stackTotal
                }
            };
            d.prototype.getNestedProperty = function (f) {
                if (f) return 0 === f.indexOf("custom.") ? A(f, this.options) : this[f]
            };
            d.prototype.getZone = function () {
                var f = this.series,
                    c = f.zones;
                f = f.zoneAxis ||
                    "y";
                var d = 0,
                    h;
                for (h = c[d]; this[f] >= h.value;) h = c[++d];
                this.nonZonedColor || (this.nonZonedColor = this.color);
                this.color = h && h.color && !this.options.color ? h.color : this.nonZonedColor;
                return h
            };
            d.prototype.hasNewShapeType = function () {
                return (this.graphic && (this.graphic.symbolName || this.graphic.element.nodeName)) !== this.shapeType
            };
            d.prototype.init = function (f, c, d) {
                this.series = f;
                this.applyOptions(c, d);
                this.id = v(this.id) ? this.id : N();
                this.resolveColor();
                f.chart.pointCount++;
                q(this, "afterInit");
                return this
            };
            d.prototype.optionsToObject =
                function (f) {
                    var c = {},
                        k = this.series,
                        h = k.options.keys,
                        e = h || k.pointArrayMap || ["y"],
                        a = e.length,
                        l = 0,
                        g = 0;
                    if (L(f) || null === f) c[e[0]] = f;
                    else if (F(f))
                        for (!h && f.length > a && (k = typeof f[0], "string" === k ? c.name = f[0] : "number" === k && (c.x = f[0]), l++); g < a;) h && "undefined" === typeof f[l] || (0 < e[g].indexOf(".") ? d.prototype.setNestedProperty(c, f[l], e[g]) : c[e[g]] = f[l]), l++, g++;
                    else "object" === typeof f && (c = f, f.dataLabels && (k._hasPointLabels = !0), f.marker && (k._hasPointMarkers = !0));
                    return c
                };
            d.prototype.resolveColor = function () {
                var f =
                    this.series;
                var c = f.chart.options.chart.colorCount;
                var d = f.chart.styledMode;
                d || this.options.color || (this.color = f.color);
                f.options.colorByPoint ? (d || (c = f.options.colors || f.chart.options.colors, this.color = this.color || c[f.colorCounter], c = c.length), d = f.colorCounter, f.colorCounter++, f.colorCounter === c && (f.colorCounter = 0)) : d = f.colorIndex;
                this.colorIndex = D(this.colorIndex, d)
            };
            d.prototype.setNestedProperty = function (f, c, d) {
                d.split(".").reduce(function (f, e, a, d) {
                        f[e] = d.length - 1 === a ? c : y(f[e], !0) ? f[e] : {};
                        return f[e]
                    },
                    f);
                return f
            };
            d.prototype.tooltipFormatter = function (f) {
                var c = this.series,
                    d = c.tooltipOptions,
                    h = D(d.valueDecimals, ""),
                    e = d.valuePrefix || "",
                    a = d.valueSuffix || "";
                c.chart.styledMode && (f = c.chart.tooltip.styledModeFormat(f));
                (c.pointArrayMap || ["y"]).forEach(function (c) {
                    c = "{point." + c;
                    if (e || a) f = f.replace(RegExp(c + "}", "g"), e + c + "}" + a);
                    f = f.replace(RegExp(c + "}", "g"), c + ":,." + h + "f}")
                });
                return E(f, {
                    point: this,
                    series: this.series
                }, c.chart)
            };
            return d
        }();
        d.Point = g;
        return d.Point
    });
    S(r, "parts/Series.js", [r["parts/Globals.js"],
        r["mixins/legend-symbol.js"], r["parts/Point.js"], r["parts/Utilities.js"]
    ], function (d, g, r, v) {
        "";
        var J = v.addEvent,
            M = v.animObject,
            E = v.arrayMax,
            A = v.arrayMin,
            F = v.clamp,
            L = v.correctFloat,
            y = v.defined,
            u = v.erase,
            D = v.error,
            h = v.extend,
            N = v.find,
            q = v.fireEvent,
            P = v.getNestedProperty,
            f = v.isArray,
            c = v.isFunction,
            k = v.isNumber,
            m = v.isString,
            e = v.merge,
            a = v.objectEach,
            l = v.pick,
            t = v.removeEvent,
            z = v.seriesType,
            x = v.splat,
            B = v.syncTimeout,
            H = d.defaultOptions,
            Q = d.defaultPlotOptions,
            I = d.seriesTypes,
            K = d.SVGElement,
            n = d.win;
        d.Series =
            z("line", null, {
                lineWidth: 2,
                allowPointSelect: !1,
                showCheckbox: !1,
                animation: {
                    duration: 1E3
                },
                events: {},
                marker: {
                    enabledThreshold: 2,
                    lineColor: "#ffffff",
                    lineWidth: 0,
                    radius: 4,
                    states: {
                        normal: {
                            animation: !0
                        },
                        hover: {
                            animation: {
                                duration: 50
                            },
                            enabled: !0,
                            radiusPlus: 2,
                            lineWidthPlus: 1
                        },
                        select: {
                            fillColor: "#cccccc",
                            lineColor: "#000000",
                            lineWidth: 2
                        }
                    }
                },
                point: {
                    events: {}
                },
                dataLabels: {
                    align: "center",
                    formatter: function () {
                        var b = this.series.chart.numberFormatter;
                        return "number" !== typeof this.y ? "" : b(this.y, -1)
                    },
                    padding: 5,
                    style: {
                        fontSize: "11px",
                        fontWeight: "bold",
                        color: "contrast",
                        textOutline: "1px contrast"
                    },
                    verticalAlign: "bottom",
                    x: 0,
                    y: 0
                },
                cropThreshold: 300,
                opacity: 1,
                pointRange: 0,
                softThreshold: !0,
                states: {
                    normal: {
                        animation: !0
                    },
                    hover: {
                        animation: {
                            duration: 50
                        },
                        lineWidthPlus: 1,
                        marker: {},
                        halo: {
                            size: 10,
                            opacity: .25
                        }
                    },
                    select: {
                        animation: {
                            duration: 0
                        }
                    },
                    inactive: {
                        animation: {
                            duration: 50
                        },
                        opacity: .2
                    }
                },
                stickyTracking: !0,
                turboThreshold: 1E3,
                findNearestPointBy: "x"
            }, {
                axisTypes: ["xAxis", "yAxis"],
                coll: "series",
                colorCounter: 0,
                cropShoulder: 1,
                directTouch: !1,
                eventsToUnbind: [],
                isCartesian: !0,
                parallelArrays: ["x", "y"],
                pointClass: r,
                requireSorting: !0,
                sorted: !0,
                init: function (b, f) {
                    q(this, "init", {
                        options: f
                    });
                    var e = this,
                        d = b.series,
                        k;
                    this.eventOptions = this.eventOptions || {};
                    e.chart = b;
                    e.options = f = e.setOptions(f);
                    e.linkedSeries = [];
                    e.bindAxes();
                    h(e, {
                        name: f.name,
                        state: "",
                        visible: !1 !== f.visible,
                        selected: !0 === f.selected
                    });
                    var m = f.events;
                    a(m, function (b, a) {
                        c(b) && e.eventOptions[a] !== b && (c(e.eventOptions[a]) && t(e, a, e.eventOptions[a]), e.eventOptions[a] = b, J(e, a, b))
                    });
                    if (m && m.click || f.point &&
                        f.point.events && f.point.events.click || f.allowPointSelect) b.runTrackerClick = !0;
                    e.getColor();
                    e.getSymbol();
                    e.parallelArrays.forEach(function (b) {
                        e[b + "Data"] || (e[b + "Data"] = [])
                    });
                    e.isCartesian && (b.hasCartesianSeries = !0);
                    d.length && (k = d[d.length - 1]);
                    e._i = l(k && k._i, -1) + 1;
                    b.orderSeries(this.insert(d));
                    f.dataSorting && f.dataSorting.enabled ? e.setDataSortingOptions() : e.points || e.data || e.setData(f.data, !1);
                    q(this, "afterInit")
                },
                is: function (b) {
                    return I[b] && this instanceof I[b]
                },
                insert: function (b) {
                    var a = this.options.index,
                        c;
                    if (k(a)) {
                        for (c = b.length; c--;)
                            if (a >= l(b[c].options.index, b[c]._i)) {
                                b.splice(c + 1, 0, this);
                                break
                            } - 1 === c && b.unshift(this);
                        c += 1
                    } else b.push(this);
                    return l(c, b.length - 1)
                },
                bindAxes: function () {
                    var b = this,
                        a = b.options,
                        c = b.chart,
                        f;
                    q(this, "bindAxes", null, function () {
                        (b.axisTypes || []).forEach(function (e) {
                            c[e].forEach(function (c) {
                                f = c.options;
                                if (a[e] === f.index || "undefined" !== typeof a[e] && a[e] === f.id || "undefined" === typeof a[e] && 0 === f.index) b.insert(c.series), b[e] = c, c.isDirty = !0
                            });
                            b[e] || b.optionalAxis === e || D(18, !0,
                                c)
                        })
                    });
                    q(this, "afterBindAxes")
                },
                updateParallelArrays: function (b, a) {
                    var c = b.series,
                        f = arguments,
                        e = k(a) ? function (f) {
                            var e = "y" === f && c.toYData ? c.toYData(b) : b[f];
                            c[f + "Data"][a] = e
                        } : function (b) {
                            Array.prototype[a].apply(c[b + "Data"], Array.prototype.slice.call(f, 2))
                        };
                    c.parallelArrays.forEach(e)
                },
                hasData: function () {
                    return this.visible && "undefined" !== typeof this.dataMax && "undefined" !== typeof this.dataMin || this.visible && this.yData && 0 < this.yData.length
                },
                autoIncrement: function () {
                    var b = this.options,
                        a = this.xIncrement,
                        c, f = b.pointIntervalUnit,
                        e = this.chart.time;
                    a = l(a, b.pointStart, 0);
                    this.pointInterval = c = l(this.pointInterval, b.pointInterval, 1);
                    f && (b = new e.Date(a), "day" === f ? e.set("Date", b, e.get("Date", b) + c) : "month" === f ? e.set("Month", b, e.get("Month", b) + c) : "year" === f && e.set("FullYear", b, e.get("FullYear", b) + c), c = b.getTime() - a);
                    this.xIncrement = a + c;
                    return a
                },
                setDataSortingOptions: function () {
                    var b = this.options;
                    h(this, {
                        requireSorting: !1,
                        sorted: !1,
                        enabledDataSorting: !0,
                        allowDG: !1
                    });
                    y(b.pointRange) || (b.pointRange = 1)
                },
                setOptions: function (b) {
                    var a =
                        this.chart,
                        c = a.options,
                        f = c.plotOptions,
                        d = a.userOptions || {};
                    b = e(b);
                    a = a.styledMode;
                    var k = {
                        plotOptions: f,
                        userOptions: b
                    };
                    q(this, "setOptions", k);
                    var h = k.plotOptions[this.type],
                        p = d.plotOptions || {};
                    this.userOptions = k.userOptions;
                    d = e(h, f.series, d.plotOptions && d.plotOptions[this.type], b);
                    this.tooltipOptions = e(H.tooltip, H.plotOptions.series && H.plotOptions.series.tooltip, H.plotOptions[this.type].tooltip, c.tooltip.userOptions, f.series && f.series.tooltip, f[this.type].tooltip, b.tooltip);
                    this.stickyTracking = l(b.stickyTracking,
                        p[this.type] && p[this.type].stickyTracking, p.series && p.series.stickyTracking, this.tooltipOptions.shared && !this.noSharedTooltip ? !0 : d.stickyTracking);
                    null === h.marker && delete d.marker;
                    this.zoneAxis = d.zoneAxis;
                    c = this.zones = (d.zones || []).slice();
                    !d.negativeColor && !d.negativeFillColor || d.zones || (f = {
                        value: d[this.zoneAxis + "Threshold"] || d.threshold || 0,
                        className: "highcharts-negative"
                    }, a || (f.color = d.negativeColor, f.fillColor = d.negativeFillColor), c.push(f));
                    c.length && y(c[c.length - 1].value) && c.push(a ? {} : {
                        color: this.color,
                        fillColor: this.fillColor
                    });
                    q(this, "afterSetOptions", {
                        options: d
                    });
                    return d
                },
                getName: function () {
                    return l(this.options.name, "Series " + (this.index + 1))
                },
                getCyclic: function (b, a, c) {
                    var f = this.chart,
                        e = this.userOptions,
                        d = b + "Index",
                        k = b + "Counter",
                        h = c ? c.length : l(f.options.chart[b + "Count"], f[b + "Count"]);
                    if (!a) {
                        var m = l(e[d], e["_" + d]);
                        y(m) || (f.series.length || (f[k] = 0), e["_" + d] = m = f[k] % h, f[k] += 1);
                        c && (a = c[m])
                    }
                    "undefined" !== typeof m && (this[d] = m);
                    this[b] = a
                },
                getColor: function () {
                    this.chart.styledMode ? this.getCyclic("color") :
                        this.options.colorByPoint ? this.options.color = null : this.getCyclic("color", this.options.color || Q[this.type].color, this.chart.options.colors)
                },
                getPointsCollection: function () {
                    return (this.hasGroupedData ? this.points : this.data) || []
                },
                getSymbol: function () {
                    this.getCyclic("symbol", this.options.marker.symbol, this.chart.options.symbols)
                },
                findPointIndex: function (b, a) {
                    var c = b.id,
                        f = b.x,
                        e = this.points,
                        d, h = this.options.dataSorting;
                    if (c) var l = this.chart.get(c);
                    else if (this.linkedParent || this.enabledDataSorting) {
                        var m =
                            h && h.matchByName ? "name" : "index";
                        l = N(e, function (a) {
                            return !a.touched && a[m] === b[m]
                        });
                        if (!l) return
                    }
                    if (l) {
                        var n = l && l.index;
                        "undefined" !== typeof n && (d = !0)
                    }
                    "undefined" === typeof n && k(f) && (n = this.xData.indexOf(f, a)); - 1 !== n && "undefined" !== typeof n && this.cropped && (n = n >= this.cropStart ? n - this.cropStart : n);
                    !d && e[n] && e[n].touched && (n = void 0);
                    return n
                },
                drawLegendSymbol: g.drawLineMarker,
                updateData: function (b, a) {
                    var c = this.options,
                        f = c.dataSorting,
                        e = this.points,
                        d = [],
                        h, l, m, n = this.requireSorting,
                        g = b.length === e.length,
                        x = !0;
                    this.xIncrement = null;
                    b.forEach(function (b, a) {
                        var l = y(b) && this.pointClass.prototype.optionsToObject.call({
                            series: this
                        }, b) || {};
                        var p = l.x;
                        if (l.id || k(p)) {
                            if (p = this.findPointIndex(l, m), -1 === p || "undefined" === typeof p ? d.push(b) : e[p] && b !== c.data[p] ? (e[p].update(b, !1, null, !1), e[p].touched = !0, n && (m = p + 1)) : e[p] && (e[p].touched = !0), !g || a !== p || f && f.enabled || this.hasDerivedData) h = !0
                        } else d.push(b)
                    }, this);
                    if (h)
                        for (b = e.length; b--;)(l = e[b]) && !l.touched && l.remove && l.remove(!1, a);
                    else !g || f && f.enabled ? x = !1 : (b.forEach(function (b,
                        a) {
                        e[a].update && b !== e[a].y && e[a].update(b, !1, null, !1)
                    }), d.length = 0);
                    e.forEach(function (b) {
                        b && (b.touched = !1)
                    });
                    if (!x) return !1;
                    d.forEach(function (b) {
                        this.addPoint(b, !1, null, null, !1)
                    }, this);
                    null === this.xIncrement && this.xData && this.xData.length && (this.xIncrement = E(this.xData), this.autoIncrement());
                    return !0
                },
                setData: function (b, a, c, e) {
                    var d = this,
                        h = d.points,
                        n = h && h.length || 0,
                        p, g = d.options,
                        w = d.chart,
                        x = g.dataSorting,
                        t = null,
                        q = d.xAxis;
                    t = g.turboThreshold;
                    var C = this.xData,
                        u = this.yData,
                        z = (p = d.pointArrayMap) && p.length,
                        B = g.keys,
                        y = 0,
                        H = 1,
                        v;
                    b = b || [];
                    p = b.length;
                    a = l(a, !0);
                    x && x.enabled && (b = this.sortData(b));
                    !1 !== e && p && n && !d.cropped && !d.hasGroupedData && d.visible && !d.isSeriesBoosting && (v = this.updateData(b, c));
                    if (!v) {
                        d.xIncrement = null;
                        d.colorCounter = 0;
                        this.parallelArrays.forEach(function (b) {
                            d[b + "Data"].length = 0
                        });
                        if (t && p > t)
                            if (t = d.getFirstValidPoint(b), k(t))
                                for (c = 0; c < p; c++) C[c] = this.autoIncrement(), u[c] = b[c];
                            else if (f(t))
                            if (z)
                                for (c = 0; c < p; c++) e = b[c], C[c] = e[0], u[c] = e.slice(1, z + 1);
                            else
                                for (B && (y = B.indexOf("x"), H = B.indexOf("y"),
                                        y = 0 <= y ? y : 0, H = 0 <= H ? H : 1), c = 0; c < p; c++) e = b[c], C[c] = e[y], u[c] = e[H];
                        else D(12, !1, w);
                        else
                            for (c = 0; c < p; c++) "undefined" !== typeof b[c] && (e = {
                                series: d
                            }, d.pointClass.prototype.applyOptions.apply(e, [b[c]]), d.updateParallelArrays(e, c));
                        u && m(u[0]) && D(14, !0, w);
                        d.data = [];
                        d.options.data = d.userOptions.data = b;
                        for (c = n; c--;) h[c] && h[c].destroy && h[c].destroy();
                        q && (q.minRange = q.userMinRange);
                        d.isDirty = w.isDirtyBox = !0;
                        d.isDirtyData = !!h;
                        c = !1
                    }
                    "point" === g.legendType && (this.processData(), this.generatePoints());
                    a && w.redraw(c)
                },
                sortData: function (b) {
                    var a = this,
                        c = a.options.dataSorting.sortKey || "y",
                        f = function (b, a) {
                            return y(a) && b.pointClass.prototype.optionsToObject.call({
                                series: b
                            }, a) || {}
                        };
                    b.forEach(function (c, e) {
                        b[e] = f(a, c);
                        b[e].index = e
                    }, this);
                    b.concat().sort(function (b, a) {
                        b = P(c, b);
                        a = P(c, a);
                        return a < b ? -1 : a > b ? 1 : 0
                    }).forEach(function (b, a) {
                        b.x = a
                    }, this);
                    a.linkedSeries && a.linkedSeries.forEach(function (a) {
                        var c = a.options,
                            e = c.data;
                        c.dataSorting && c.dataSorting.enabled || !e || (e.forEach(function (c, d) {
                            e[d] = f(a, c);
                            b[d] && (e[d].x = b[d].x, e[d].index =
                                d)
                        }), a.setData(e, !1))
                    });
                    return b
                },
                processData: function (b) {
                    var a = this.xData,
                        c = this.yData,
                        f = a.length;
                    var e = 0;
                    var d = this.xAxis,
                        k = this.options;
                    var h = k.cropThreshold;
                    var l = this.getExtremesFromAll || k.getExtremesFromAll,
                        m = this.isCartesian;
                    k = d && d.val2lin;
                    var n = d && d.isLog,
                        g = this.requireSorting;
                    if (m && !this.isDirty && !d.isDirty && !this.yAxis.isDirty && !b) return !1;
                    if (d) {
                        b = d.getExtremes();
                        var x = b.min;
                        var t = b.max
                    }
                    if (m && this.sorted && !l && (!h || f > h || this.forceCrop))
                        if (a[f - 1] < x || a[0] > t) a = [], c = [];
                        else if (this.yData && (a[0] <
                            x || a[f - 1] > t)) {
                        e = this.cropData(this.xData, this.yData, x, t);
                        a = e.xData;
                        c = e.yData;
                        e = e.start;
                        var q = !0
                    }
                    for (h = a.length || 1; --h;)
                        if (f = n ? k(a[h]) - k(a[h - 1]) : a[h] - a[h - 1], 0 < f && ("undefined" === typeof u || f < u)) var u = f;
                        else 0 > f && g && (D(15, !1, this.chart), g = !1);
                    this.cropped = q;
                    this.cropStart = e;
                    this.processedXData = a;
                    this.processedYData = c;
                    this.closestPointRange = this.basePointRange = u
                },
                cropData: function (b, a, c, f, e) {
                    var d = b.length,
                        k = 0,
                        h = d,
                        m;
                    e = l(e, this.cropShoulder);
                    for (m = 0; m < d; m++)
                        if (b[m] >= c) {
                            k = Math.max(0, m - e);
                            break
                        } for (c = m; c <
                        d; c++)
                        if (b[c] > f) {
                            h = c + e;
                            break
                        } return {
                        xData: b.slice(k, h),
                        yData: a.slice(k, h),
                        start: k,
                        end: h
                    }
                },
                generatePoints: function () {
                    var b = this.options,
                        a = b.data,
                        c = this.data,
                        f, e = this.processedXData,
                        d = this.processedYData,
                        k = this.pointClass,
                        l = e.length,
                        m = this.cropStart || 0,
                        n = this.hasGroupedData;
                    b = b.keys;
                    var g = [],
                        t;
                    c || n || (c = [], c.length = a.length, c = this.data = c);
                    b && n && (this.options.keys = !1);
                    for (t = 0; t < l; t++) {
                        var u = m + t;
                        if (n) {
                            var B = (new k).init(this, [e[t]].concat(x(d[t])));
                            B.dataGroup = this.groupMap[t];
                            B.dataGroup.options && (B.options =
                                B.dataGroup.options, h(B, B.dataGroup.options), delete B.dataLabels)
                        } else(B = c[u]) || "undefined" === typeof a[u] || (c[u] = B = (new k).init(this, a[u], e[t]));
                        B && (B.index = u, g[t] = B)
                    }
                    this.options.keys = b;
                    if (c && (l !== (f = c.length) || n))
                        for (t = 0; t < f; t++) t !== m || n || (t += l), c[t] && (c[t].destroyElements(), c[t].plotX = void 0);
                    this.data = c;
                    this.points = g;
                    q(this, "afterGeneratePoints")
                },
                getXExtremes: function (b) {
                    return {
                        min: A(b),
                        max: E(b)
                    }
                },
                getExtremes: function (b) {
                    var a = this.xAxis,
                        c = this.yAxis,
                        e = this.processedXData || this.xData,
                        d = [],
                        h =
                        0,
                        l = 0;
                    var m = 0;
                    var n = this.requireSorting ? this.cropShoulder : 0,
                        g = c ? c.positiveValuesOnly : !1,
                        t;
                    b = b || this.stackedYData || this.processedYData || [];
                    c = b.length;
                    a && (m = a.getExtremes(), l = m.min, m = m.max);
                    for (t = 0; t < c; t++) {
                        var x = e[t];
                        var u = b[t];
                        var B = (k(u) || f(u)) && (u.length || 0 < u || !g);
                        x = this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || !a || (e[t + n] || x) >= l && (e[t - n] || x) <= m;
                        if (B && x)
                            if (B = u.length)
                                for (; B--;) k(u[B]) && (d[h++] = u[B]);
                            else d[h++] = u
                    }
                    this.dataMin = A(d);
                    this.dataMax = E(d);
                    q(this, "afterGetExtremes")
                },
                getFirstValidPoint: function (b) {
                    for (var a = null, c = b.length, f = 0; null === a && f < c;) a = b[f], f++;
                    return a
                },
                translate: function () {
                    this.processedXData || this.processData();
                    this.generatePoints();
                    var b = this.options,
                        a = b.stacking,
                        c = this.xAxis,
                        e = c.categories,
                        d = this.enabledDataSorting,
                        h = this.yAxis,
                        m = this.points,
                        p = m.length,
                        n = !!this.modifyValue,
                        g, t = this.pointPlacementToXValue(),
                        x = !!t,
                        u = b.threshold,
                        B = b.startFromThreshold ? u : 0,
                        z, H = this.zoneAxis || "y",
                        v = Number.MAX_VALUE;
                    for (g = 0; g < p; g++) {
                        var K = m[g],
                            r = K.x;
                        var I = K.y;
                        var D = K.low,
                            A = a && h.stacks[(this.negStacks && I < (B ? 0 : u) ? "-" : "") + this.stackKey];
                        h.positiveValuesOnly && null !== I && 0 >= I && (K.isNull = !0);
                        K.plotX = z = L(F(c.translate(r, 0, 0, 0, 1, t, "flags" === this.type), -1E5, 1E5));
                        if (a && this.visible && A && A[r]) {
                            var N = this.getStackIndicator(N, r, this.index);
                            if (!K.isNull) {
                                var Q = A[r];
                                var E = Q.points[N.key]
                            }
                        }
                        f(E) && (D = E[0], I = E[1], D === B && N.key === A[r].base && (D = l(k(u) && u, h.min)), h.positiveValuesOnly && 0 >= D && (D = null), K.total = K.stackTotal = Q.total, K.percentage = Q.total && K.y / Q.total * 100, K.stackY = I, this.irregularWidths ||
                            Q.setOffset(this.pointXOffset || 0, this.barW || 0));
                        K.yBottom = y(D) ? F(h.translate(D, 0, 1, 0, 1), -1E5, 1E5) : null;
                        n && (I = this.modifyValue(I, K));
                        K.plotY = I = "number" === typeof I && Infinity !== I ? F(h.translate(I, 0, 1, 0, 1), -1E5, 1E5) : void 0;
                        K.isInside = "undefined" !== typeof I && 0 <= I && I <= h.len && 0 <= z && z <= c.len;
                        K.clientX = x ? L(c.translate(r, 0, 0, 0, 1, t)) : z;
                        K.negative = K[H] < (b[H + "Threshold"] || u || 0);
                        K.category = e && "undefined" !== typeof e[K.x] ? e[K.x] : K.x;
                        if (!K.isNull && !1 !== K.visible) {
                            "undefined" !== typeof P && (v = Math.min(v, Math.abs(z - P)));
                            var P = z
                        }
                        K.zone = this.zones.length && K.getZone();
                        !K.graphic && this.group && d && (K.isNew = !0)
                    }
                    this.closestPointRangePx = v;
                    q(this, "afterTranslate")
                },
                getValidPoints: function (b, a, c) {
                    var f = this.chart;
                    return (b || this.points || []).filter(function (b) {
                        return a && !f.isInsidePlot(b.plotX, b.plotY, f.inverted) ? !1 : !1 !== b.visible && (c || !b.isNull)
                    })
                },
                getClipBox: function (b, a) {
                    var c = this.options,
                        f = this.chart,
                        e = f.inverted,
                        d = this.xAxis,
                        k = d && this.yAxis;
                    b && !1 === c.clip && k ? b = e ? {
                        y: -f.chartWidth + k.len + k.pos,
                        height: f.chartWidth,
                        width: f.chartHeight,
                        x: -f.chartHeight + d.len + d.pos
                    } : {
                        y: -k.pos,
                        height: f.chartHeight,
                        width: f.chartWidth,
                        x: -d.pos
                    } : (b = this.clipBox || f.clipBox, a && (b.width = f.plotSizeX, b.x = 0));
                    return a ? {
                        width: b.width,
                        x: b.x
                    } : b
                },
                setClip: function (b) {
                    var a = this.chart,
                        c = this.options,
                        f = a.renderer,
                        e = a.inverted,
                        d = this.clipBox,
                        k = this.getClipBox(b),
                        h = this.sharedClipKey || ["_sharedClip", b && b.duration, b && b.easing, k.height, c.xAxis, c.yAxis].join(),
                        l = a[h],
                        m = a[h + "m"];
                    b && (k.width = 0, e && (k.x = a.plotHeight + (!1 !== c.clip ? 0 : a.plotTop)));
                    l ? a.hasLoaded || l.attr(k) : (b &&
                        (a[h + "m"] = m = f.clipRect(e ? a.plotSizeX + 99 : -99, e ? -a.plotLeft : -a.plotTop, 99, e ? a.chartWidth : a.chartHeight)), a[h] = l = f.clipRect(k), l.count = {
                            length: 0
                        });
                    b && !l.count[this.index] && (l.count[this.index] = !0, l.count.length += 1);
                    if (!1 !== c.clip || b) this.group.clip(b || d ? l : a.clipRect), this.markerGroup.clip(m), this.sharedClipKey = h;
                    b || (l.count[this.index] && (delete l.count[this.index], --l.count.length), 0 === l.count.length && h && a[h] && (d || (a[h] = a[h].destroy()), a[h + "m"] && (a[h + "m"] = a[h + "m"].destroy())))
                },
                animate: function (b) {
                    var a =
                        this.chart,
                        c = M(this.options.animation);
                    if (!a.hasRendered)
                        if (b) this.setClip(c);
                        else {
                            var f = this.sharedClipKey;
                            b = a[f];
                            var e = this.getClipBox(c, !0);
                            b && b.animate(e, c);
                            a[f + "m"] && a[f + "m"].animate({
                                width: e.width + 99,
                                x: e.x - (a.inverted ? 0 : 99)
                            }, c)
                        }
                },
                afterAnimate: function () {
                    this.setClip();
                    q(this, "afterAnimate");
                    this.finishedAnimating = !0
                },
                drawPoints: function () {
                    var b = this.points,
                        a = this.chart,
                        c, f, e = this.options.marker,
                        d = this[this.specialGroup] || this.markerGroup,
                        k = this.xAxis,
                        h = l(e.enabled, !k || k.isRadial ? !0 : null, this.closestPointRangePx >=
                            e.enabledThreshold * e.radius);
                    if (!1 !== e.enabled || this._hasPointMarkers)
                        for (c = 0; c < b.length; c++) {
                            var m = b[c];
                            var n = (f = m.graphic) ? "animate" : "attr";
                            var g = m.marker || {};
                            var t = !!m.marker;
                            if ((h && "undefined" === typeof g.enabled || g.enabled) && !m.isNull && !1 !== m.visible) {
                                var x = l(g.symbol, this.symbol);
                                var q = this.markerAttribs(m, m.selected && "select");
                                this.enabledDataSorting && (m.startXPos = k.reversed ? -q.width : k.width);
                                var u = !1 !== m.isInside;
                                f ? f[u ? "show" : "hide"](u).animate(q) : u && (0 < q.width || m.hasImage) && (m.graphic = f = a.renderer.symbol(x,
                                    q.x, q.y, q.width, q.height, t ? g : e).add(d), this.enabledDataSorting && a.hasRendered && (f.attr({
                                    x: m.startXPos
                                }), n = "animate"));
                                f && "animate" === n && f[u ? "show" : "hide"](u).animate(q);
                                if (f && !a.styledMode) f[n](this.pointAttribs(m, m.selected && "select"));
                                f && f.addClass(m.getClassName(), !0)
                            } else f && (m.graphic = f.destroy())
                        }
                },
                markerAttribs: function (b, a) {
                    var c = this.options.marker,
                        f = b.marker || {},
                        e = f.symbol || c.symbol,
                        d = l(f.radius, c.radius);
                    a && (c = c.states[a], a = f.states && f.states[a], d = l(a && a.radius, c && c.radius, d + (c && c.radiusPlus ||
                        0)));
                    b.hasImage = e && 0 === e.indexOf("url");
                    b.hasImage && (d = 0);
                    b = {
                        x: Math.floor(b.plotX) - d,
                        y: b.plotY - d
                    };
                    d && (b.width = b.height = 2 * d);
                    return b
                },
                pointAttribs: function (b, a) {
                    var c = this.options.marker,
                        f = b && b.options,
                        e = f && f.marker || {},
                        d = this.color,
                        k = f && f.color,
                        h = b && b.color;
                    f = l(e.lineWidth, c.lineWidth);
                    var m = b && b.zone && b.zone.color;
                    b = 1;
                    d = k || m || h || d;
                    k = e.fillColor || c.fillColor || d;
                    d = e.lineColor || c.lineColor || d;
                    a = a || "normal";
                    c = c.states[a];
                    a = e.states && e.states[a] || {};
                    f = l(a.lineWidth, c.lineWidth, f + l(a.lineWidthPlus, c.lineWidthPlus,
                        0));
                    k = a.fillColor || c.fillColor || k;
                    d = a.lineColor || c.lineColor || d;
                    b = l(a.opacity, c.opacity, b);
                    return {
                        stroke: d,
                        "stroke-width": f,
                        fill: k,
                        opacity: b
                    }
                },
                destroy: function (b) {
                    var c = this,
                        f = c.chart,
                        e = /AppleWebKit\/533/.test(n.navigator.userAgent),
                        d, k, h = c.data || [],
                        l, m;
                    q(c, "destroy");
                    this.removeEvents(b);
                    (c.axisTypes || []).forEach(function (a) {
                        (m = c[a]) && m.series && (u(m.series, c), m.isDirty = m.forceRedraw = !0)
                    });
                    c.legendItem && c.chart.legend.destroyItem(c);
                    for (k = h.length; k--;)(l = h[k]) && l.destroy && l.destroy();
                    c.points = null;
                    v.clearTimeout(c.animationTimeout);
                    a(c, function (a, b) {
                        a instanceof K && !a.survive && (d = e && "group" === b ? "hide" : "destroy", a[d]())
                    });
                    f.hoverSeries === c && (f.hoverSeries = null);
                    u(f.series, c);
                    f.orderSeries();
                    a(c, function (a, f) {
                        b && "hcEvents" === f || delete c[f]
                    })
                },
                getGraphPath: function (a, c, f) {
                    var b = this,
                        e = b.options,
                        d = e.step,
                        k, h = [],
                        l = [],
                        m;
                    a = a || b.points;
                    (k = a.reversed) && a.reverse();
                    (d = {
                        right: 1,
                        center: 2
                    } [d] || d && 3) && k && (d = 4 - d);
                    a = this.getValidPoints(a, !1, !(e.connectNulls && !c && !f));
                    a.forEach(function (k, n) {
                        var g = k.plotX,
                            p = k.plotY,
                            t = a[n - 1];
                        (k.leftCliff || t && t.rightCliff) && !f && (m = !0);
                        k.isNull && !y(c) && 0 < n ? m = !e.connectNulls : k.isNull && !c ? m = !0 : (0 === n || m ? n = ["M", k.plotX, k.plotY] : b.getPointSpline ? n = b.getPointSpline(a, k, n) : d ? (n = 1 === d ? ["L", t.plotX, p] : 2 === d ? ["L", (t.plotX + g) / 2, t.plotY, "L", (t.plotX + g) / 2, p] : ["L", g, t.plotY], n.push("L", g, p)) : n = ["L", g, p], l.push(k.x), d && (l.push(k.x), 2 === d && l.push(k.x)), h.push.apply(h, n), m = !1)
                    });
                    h.xMap = l;
                    return b.graphPath = h
                },
                drawGraph: function () {
                    var a = this,
                        c = this.options,
                        f = (this.gappedPath || this.getGraphPath).call(this),
                        e = this.chart.styledMode,
                        d = [
                            ["graph", "highcharts-graph"]
                        ];
                    e || d[0].push(c.lineColor || this.color || "#cccccc", c.dashStyle);
                    d = a.getZonesGraphs(d);
                    d.forEach(function (b, d) {
                        var k = b[0],
                            h = a[k],
                            l = h ? "animate" : "attr";
                        h ? (h.endX = a.preventGraphAnimation ? null : f.xMap, h.animate({
                            d: f
                        })) : f.length && (a[k] = h = a.chart.renderer.path(f).addClass(b[1]).attr({
                            zIndex: 1
                        }).add(a.group));
                        h && !e && (k = {
                            stroke: b[2],
                            "stroke-width": c.lineWidth,
                            fill: a.fillGraph && a.color || "none"
                        }, b[3] ? k.dashstyle = b[3] : "square" !== c.linecap && (k["stroke-linecap"] =
                            k["stroke-linejoin"] = "round"), h[l](k).shadow(2 > d && c.shadow));
                        h && (h.startX = f.xMap, h.isArea = f.isArea)
                    })
                },
                getZonesGraphs: function (a) {
                    this.zones.forEach(function (b, c) {
                        c = ["zone-graph-" + c, "highcharts-graph highcharts-zone-graph-" + c + " " + (b.className || "")];
                        this.chart.styledMode || c.push(b.color || this.color, b.dashStyle || this.options.dashStyle);
                        a.push(c)
                    }, this);
                    return a
                },
                applyZones: function () {
                    var a = this,
                        c = this.chart,
                        f = c.renderer,
                        e = this.zones,
                        d, k, h = this.clips || [],
                        m, n = this.graph,
                        g = this.area,
                        t = Math.max(c.chartWidth,
                            c.chartHeight),
                        x = this[(this.zoneAxis || "y") + "Axis"],
                        q = c.inverted,
                        u, B, z, y = !1;
                    if (e.length && (n || g) && x && "undefined" !== typeof x.min) {
                        var K = x.reversed;
                        var H = x.horiz;
                        n && !this.showLine && n.hide();
                        g && g.hide();
                        var v = x.getExtremes();
                        e.forEach(function (b, e) {
                            d = K ? H ? c.plotWidth : 0 : H ? 0 : x.toPixels(v.min) || 0;
                            d = F(l(k, d), 0, t);
                            k = F(Math.round(x.toPixels(l(b.value, v.max), !0) || 0), 0, t);
                            y && (d = k = x.toPixels(v.max));
                            u = Math.abs(d - k);
                            B = Math.min(d, k);
                            z = Math.max(d, k);
                            x.isXAxis ? (m = {
                                x: q ? z : B,
                                y: 0,
                                width: u,
                                height: t
                            }, H || (m.x = c.plotHeight -
                                m.x)) : (m = {
                                x: 0,
                                y: q ? z : B,
                                width: t,
                                height: u
                            }, H && (m.y = c.plotWidth - m.y));
                            q && f.isVML && (m = x.isXAxis ? {
                                x: 0,
                                y: K ? B : z,
                                height: m.width,
                                width: c.chartWidth
                            } : {
                                x: m.y - c.plotLeft - c.spacingBox.x,
                                y: 0,
                                width: m.height,
                                height: c.chartHeight
                            });
                            h[e] ? h[e].animate(m) : h[e] = f.clipRect(m);
                            n && a["zone-graph-" + e].clip(h[e]);
                            g && a["zone-area-" + e].clip(h[e]);
                            y = b.value > v.max;
                            a.resetZones && 0 === k && (k = void 0)
                        });
                        this.clips = h
                    } else a.visible && (n && n.show(!0), g && g.show(!0))
                },
                invertGroups: function (a) {
                    function b() {
                        ["group", "markerGroup"].forEach(function (b) {
                            c[b] &&
                                (f.renderer.isVML && c[b].attr({
                                    width: c.yAxis.len,
                                    height: c.xAxis.len
                                }), c[b].width = c.yAxis.len, c[b].height = c.xAxis.len, c[b].invert(c.isRadialSeries ? !1 : a))
                        })
                    }
                    var c = this,
                        f = c.chart;
                    c.xAxis && (c.eventsToUnbind.push(J(f, "resize", b)), b(), c.invertGroups = b)
                },
                plotGroup: function (a, c, f, e, d) {
                    var b = this[a],
                        k = !b;
                    k && (this[a] = b = this.chart.renderer.g().attr({
                        zIndex: e || .1
                    }).add(d));
                    b.addClass("highcharts-" + c + " highcharts-series-" + this.index + " highcharts-" + this.type + "-series " + (y(this.colorIndex) ? "highcharts-color-" + this.colorIndex +
                        " " : "") + (this.options.className || "") + (b.hasClass("highcharts-tracker") ? " highcharts-tracker" : ""), !0);
                    b.attr({
                        visibility: f
                    })[k ? "attr" : "animate"](this.getPlotBox());
                    return b
                },
                getPlotBox: function () {
                    var a = this.chart,
                        c = this.xAxis,
                        f = this.yAxis;
                    a.inverted && (c = f, f = this.xAxis);
                    return {
                        translateX: c ? c.left : a.plotLeft,
                        translateY: f ? f.top : a.plotTop,
                        scaleX: 1,
                        scaleY: 1
                    }
                },
                removeEvents: function (a) {
                    a ? this.eventsToUnbind.length && (this.eventsToUnbind.forEach(function (a) {
                        a()
                    }), this.eventsToUnbind.length = 0) : t(this)
                },
                render: function () {
                    var a =
                        this,
                        c = a.chart,
                        f = a.options,
                        e = !a.finishedAnimating && c.renderer.isSVG && M(f.animation).duration,
                        d = a.visible ? "inherit" : "hidden",
                        k = f.zIndex,
                        h = a.hasRendered,
                        l = c.seriesGroup,
                        m = c.inverted;
                    q(this, "render");
                    var n = a.plotGroup("group", "series", d, k, l);
                    a.markerGroup = a.plotGroup("markerGroup", "markers", d, k, l);
                    e && a.animate && a.animate(!0);
                    n.inverted = a.isCartesian || a.invertable ? m : !1;
                    a.drawGraph && (a.drawGraph(), a.applyZones());
                    a.visible && a.drawPoints();
                    a.drawDataLabels && a.drawDataLabels();
                    a.redrawPoints && a.redrawPoints();
                    a.drawTracker && !1 !== a.options.enableMouseTracking && a.drawTracker();
                    a.invertGroups(m);
                    !1 === f.clip || a.sharedClipKey || h || n.clip(c.clipRect);
                    e && a.animate && a.animate();
                    h || (a.animationTimeout = B(function () {
                        a.afterAnimate()
                    }, e || 0));
                    a.isDirty = !1;
                    a.hasRendered = !0;
                    q(a, "afterRender")
                },
                redraw: function () {
                    var a = this.chart,
                        c = this.isDirty || this.isDirtyData,
                        f = this.group,
                        e = this.xAxis,
                        d = this.yAxis;
                    f && (a.inverted && f.attr({
                        width: a.plotWidth,
                        height: a.plotHeight
                    }), f.animate({
                        translateX: l(e && e.left, a.plotLeft),
                        translateY: l(d &&
                            d.top, a.plotTop)
                    }));
                    this.translate();
                    this.render();
                    c && delete this.kdTree
                },
                kdAxisArray: ["clientX", "plotY"],
                searchPoint: function (a, c) {
                    var b = this.xAxis,
                        f = this.yAxis,
                        e = this.chart.inverted;
                    return this.searchKDTree({
                        clientX: e ? b.len - a.chartY + b.pos : a.chartX - b.pos,
                        plotY: e ? f.len - a.chartX + f.pos : a.chartY - f.pos
                    }, c, a)
                },
                buildKDTree: function (a) {
                    function b(a, f, e) {
                        var d;
                        if (d = a && a.length) {
                            var k = c.kdAxisArray[f % e];
                            a.sort(function (a, b) {
                                return a[k] - b[k]
                            });
                            d = Math.floor(d / 2);
                            return {
                                point: a[d],
                                left: b(a.slice(0, d), f + 1, e),
                                right: b(a.slice(d + 1), f + 1, e)
                            }
                        }
                    }
                    this.buildingKdTree = !0;
                    var c = this,
                        f = -1 < c.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                    delete c.kdTree;
                    B(function () {
                        c.kdTree = b(c.getValidPoints(null, !c.directTouch), f, f);
                        c.buildingKdTree = !1
                    }, c.options.kdNow || a && "touchstart" === a.type ? 0 : 1)
                },
                searchKDTree: function (a, c, f) {
                    function b(a, c, f, l) {
                        var m = c.point,
                            n = e.kdAxisArray[f % l],
                            g = m;
                        var p = y(a[d]) && y(m[d]) ? Math.pow(a[d] - m[d], 2) : null;
                        var t = y(a[k]) && y(m[k]) ? Math.pow(a[k] - m[k], 2) : null;
                        t = (p || 0) + (t || 0);
                        m.dist = y(t) ? Math.sqrt(t) : Number.MAX_VALUE;
                        m.distX = y(p) ? Math.sqrt(p) : Number.MAX_VALUE;
                        n = a[n] - m[n];
                        t = 0 > n ? "left" : "right";
                        p = 0 > n ? "right" : "left";
                        c[t] && (t = b(a, c[t], f + 1, l), g = t[h] < g[h] ? t : m);
                        c[p] && Math.sqrt(n * n) < g[h] && (a = b(a, c[p], f + 1, l), g = a[h] < g[h] ? a : g);
                        return g
                    }
                    var e = this,
                        d = this.kdAxisArray[0],
                        k = this.kdAxisArray[1],
                        h = c ? "distX" : "dist";
                    c = -1 < e.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                    this.kdTree || this.buildingKdTree || this.buildKDTree(f);
                    if (this.kdTree) return b(a, this.kdTree, c, c)
                },
                pointPlacementToXValue: function () {
                    var a = this.options,
                        c = a.pointRange,
                        f = this.xAxis;
                    a = a.pointPlacement;
                    "between" === a && (a = f.reversed ? -.5 : .5);
                    return k(a) ? a * l(c, f.pointRange) : 0
                }
            });
        ""
    });
    S(r, "parts/Stacking.js", [r["parts/Globals.js"], r["parts/Utilities.js"]], function (d, g) {
        var r = g.correctFloat,
            v = g.defined,
            J = g.destroyObjectProperties,
            M = g.format,
            E = g.objectEach,
            A = g.pick;
        g = d.Axis;
        var F = d.Chart,
            L = d.Series;
        d.StackItem = function (d, g, v, h, r) {
            var q = d.chart.inverted;
            this.axis = d;
            this.isNegative = v;
            this.options = g = g || {};
            this.x = h;
            this.total = null;
            this.points = {};
            this.stack = r;
            this.rightCliff =
                this.leftCliff = 0;
            this.alignOptions = {
                align: g.align || (q ? v ? "left" : "right" : "center"),
                verticalAlign: g.verticalAlign || (q ? "middle" : v ? "bottom" : "top"),
                y: g.y,
                x: g.x
            };
            this.textAlign = g.textAlign || (q ? v ? "right" : "left" : "center")
        };
        d.StackItem.prototype = {
            destroy: function () {
                J(this, this.axis)
            },
            render: function (d) {
                var g = this.axis.chart,
                    y = this.options,
                    h = y.format;
                h = h ? M(h, this, g) : y.formatter.call(this);
                this.label ? this.label.attr({
                    text: h,
                    visibility: "hidden"
                }) : (this.label = g.renderer.label(h, null, null, y.shape, null, null, y.useHTML,
                    !1, "stack-labels"), h = {
                    text: h,
                    rotation: y.rotation,
                    padding: A(y.padding, 5),
                    visibility: "hidden"
                }, this.label.attr(h), g.styledMode || this.label.css(y.style), this.label.added || this.label.add(d));
                this.label.labelrank = g.plotHeight
            },
            setOffset: function (d, g, r, h, N) {
                var q = this.axis,
                    u = q.chart;
                h = q.translate(q.usePercentage ? 100 : h ? h : this.total, 0, 0, 0, 1);
                r = q.translate(r ? r : 0);
                r = v(h) && Math.abs(h - r);
                d = A(N, u.xAxis[0].translate(this.x)) + d;
                q = v(h) && this.getStackBox(u, this, d, h, g, r, q);
                g = this.label;
                r = this.isNegative;
                d = "justify" ===
                    A(this.options.overflow, "justify");
                var f = this.textAlign;
                g && q && (N = g.getBBox(), h = g.padding, f = "left" === f ? u.inverted ? -h : h : "right" === f ? N.width : u.inverted && "center" === f ? N.width / 2 : u.inverted ? r ? N.width + h : -h : N.width / 2, r = u.inverted ? N.height / 2 : r ? -h : N.height, this.alignOptions.x = A(this.options.x, 0), this.alignOptions.y = A(this.options.y, 0), q.x -= f, q.y -= r, g.align(this.alignOptions, null, q), u.isInsidePlot(g.alignAttr.x + f - this.alignOptions.x, g.alignAttr.y + r - this.alignOptions.y) ? g.show() : (g.alignAttr.y = -9999, d = !1), d &&
                    L.prototype.justifyDataLabel.call(this.axis, g, this.alignOptions, g.alignAttr, N, q), g.attr({
                        x: g.alignAttr.x,
                        y: g.alignAttr.y
                    }), A(!d && this.options.crop, !0) && ((u = u.isInsidePlot(g.x - h + g.width, g.y) && u.isInsidePlot(g.x + h, g.y)) || g.hide()))
            },
            getStackBox: function (d, g, r, h, v, q, A) {
                var f = g.axis.reversed,
                    c = d.inverted;
                d = A.height + A.pos - (c ? d.plotLeft : d.plotTop);
                g = g.isNegative && !f || !g.isNegative && f;
                return {
                    x: c ? g ? h : h - q : r,
                    y: c ? d - r - v : g ? d - h - q : d - h,
                    width: c ? q : v,
                    height: c ? v : q
                }
            }
        };
        F.prototype.getStacks = function () {
            var d = this,
                g = d.inverted;
            d.yAxis.forEach(function (d) {
                d.stacks && d.hasVisibleSeries && (d.oldStacks = d.stacks)
            });
            d.series.forEach(function (u) {
                var h = u.xAxis && u.xAxis.options || {};
                !u.options.stacking || !0 !== u.visible && !1 !== d.options.chart.ignoreHiddenSeries || (u.stackKey = [u.type, A(u.options.stack, ""), g ? h.top : h.left, g ? h.height : h.width].join())
            })
        };
        g.prototype.buildStacks = function () {
            var g = this.series,
                u = A(this.options.reversedStacks, !0),
                v = g.length,
                h;
            if (!this.isXAxis) {
                this.usePercentage = !1;
                for (h = v; h--;) {
                    var r = g[u ? h : v - h - 1];
                    r.setStackedPoints()
                }
                for (h =
                    0; h < v; h++) g[h].modifyStacks();
                d.fireEvent(this, "afterBuildStacks")
            }
        };
        g.prototype.renderStackTotals = function () {
            var d = this.chart,
                g = d.renderer,
                v = this.stacks,
                h = this.stackTotalGroup;
            h || (this.stackTotalGroup = h = g.g("stack-labels").attr({
                visibility: "visible",
                zIndex: 6
            }).add());
            h.translate(d.plotLeft, d.plotTop);
            E(v, function (d) {
                E(d, function (d) {
                    d.render(h)
                })
            })
        };
        g.prototype.resetStacks = function () {
            var d = this,
                g = d.stacks;
            d.isXAxis || E(g, function (g) {
                E(g, function (h, u) {
                    h.touched < d.stacksTouched ? (h.destroy(), delete g[u]) :
                        (h.total = null, h.cumulative = null)
                })
            })
        };
        g.prototype.cleanStacks = function () {
            if (!this.isXAxis) {
                if (this.oldStacks) var d = this.stacks = this.oldStacks;
                E(d, function (d) {
                    E(d, function (d) {
                        d.cumulative = d.total
                    })
                })
            }
        };
        L.prototype.setStackedPoints = function () {
            if (this.options.stacking && (!0 === this.visible || !1 === this.chart.options.chart.ignoreHiddenSeries)) {
                var g = this.processedXData,
                    u = this.processedYData,
                    D = [],
                    h = u.length,
                    N = this.options,
                    q = N.threshold,
                    F = A(N.startFromThreshold && q, 0),
                    f = N.stack;
                N = N.stacking;
                var c = this.stackKey,
                    k = "-" + c,
                    m = this.negStacks,
                    e = this.yAxis,
                    a = e.stacks,
                    l = e.oldStacks,
                    t, z;
                e.stacksTouched += 1;
                for (z = 0; z < h; z++) {
                    var x = g[z];
                    var B = u[z];
                    var H = this.getStackIndicator(H, x, this.index);
                    var Q = H.key;
                    var I = (t = m && B < (F ? 0 : q)) ? k : c;
                    a[I] || (a[I] = {});
                    a[I][x] || (l[I] && l[I][x] ? (a[I][x] = l[I][x], a[I][x].total = null) : a[I][x] = new d.StackItem(e, e.options.stackLabels, t, x, f));
                    I = a[I][x];
                    null !== B ? (I.points[Q] = I.points[this.index] = [A(I.cumulative, F)], v(I.cumulative) || (I.base = Q), I.touched = e.stacksTouched, 0 < H.index && !1 === this.singleStacks &&
                        (I.points[Q][0] = I.points[this.index + "," + x + ",0"][0])) : I.points[Q] = I.points[this.index] = null;
                    "percent" === N ? (t = t ? c : k, m && a[t] && a[t][x] ? (t = a[t][x], I.total = t.total = Math.max(t.total, I.total) + Math.abs(B) || 0) : I.total = r(I.total + (Math.abs(B) || 0))) : I.total = r(I.total + (B || 0));
                    I.cumulative = A(I.cumulative, F) + (B || 0);
                    null !== B && (I.points[Q].push(I.cumulative), D[z] = I.cumulative)
                }
                "percent" === N && (e.usePercentage = !0);
                this.stackedYData = D;
                e.oldStacks = {}
            }
        };
        L.prototype.modifyStacks = function () {
            var d = this,
                g = d.stackKey,
                v = d.yAxis.stacks,
                h = d.processedXData,
                r, q = d.options.stacking;
            d[q + "Stacker"] && [g, "-" + g].forEach(function (g) {
                for (var f = h.length, c, k; f--;)
                    if (c = h[f], r = d.getStackIndicator(r, c, d.index, g), k = (c = v[g] && v[g][c]) && c.points[r.key]) d[q + "Stacker"](k, c, f)
            })
        };
        L.prototype.percentStacker = function (d, g, v) {
            g = g.total ? 100 / g.total : 0;
            d[0] = r(d[0] * g);
            d[1] = r(d[1] * g);
            this.stackedYData[v] = d[1]
        };
        L.prototype.getStackIndicator = function (d, g, r, h) {
            !v(d) || d.x !== g || h && d.key !== h ? d = {
                x: g,
                index: 0,
                key: h
            } : d.index++;
            d.key = [r, g, d.index].join();
            return d
        }
    });
    S(r,
        "parts/Dynamics.js", [r["parts/Globals.js"], r["parts/Point.js"], r["parts/Time.js"], r["parts/Utilities.js"]],
        function (d, g, r, v) {
            var J = v.addEvent,
                M = v.animate,
                E = v.createElement,
                A = v.css,
                F = v.defined,
                L = v.erase,
                y = v.error,
                u = v.extend,
                D = v.fireEvent,
                h = v.isArray,
                N = v.isNumber,
                q = v.isObject,
                P = v.isString,
                f = v.merge,
                c = v.objectEach,
                k = v.pick,
                m = v.relativeLength,
                e = v.setAnimation,
                a = v.splat,
                l = d.Axis;
            v = d.Chart;
            var t = d.Series,
                z = d.seriesTypes;
            d.cleanRecursively = function (a, f) {
                var e = {};
                c(a, function (c, k) {
                    if (q(a[k], !0) && !a.nodeType &&
                        f[k]) c = d.cleanRecursively(a[k], f[k]), Object.keys(c).length && (e[k] = c);
                    else if (q(a[k]) || a[k] !== f[k]) e[k] = a[k]
                });
                return e
            };
            u(v.prototype, {
                addSeries: function (a, c, f) {
                    var e, d = this;
                    a && (c = k(c, !0), D(d, "addSeries", {
                        options: a
                    }, function () {
                        e = d.initSeries(a);
                        d.isDirtyLegend = !0;
                        d.linkSeries();
                        e.enabledDataSorting && e.setData(a.data, !1);
                        D(d, "afterAddSeries", {
                            series: e
                        });
                        c && d.redraw(f)
                    }));
                    return e
                },
                addAxis: function (a, c, f, e) {
                    return this.createAxis(c ? "xAxis" : "yAxis", {
                        axis: a,
                        redraw: f,
                        animation: e
                    })
                },
                addColorAxis: function (a,
                    c, f) {
                    return this.createAxis("colorAxis", {
                        axis: a,
                        redraw: c,
                        animation: f
                    })
                },
                createAxis: function (c, e) {
                    var h = this.options,
                        m = "colorAxis" === c,
                        g = e.redraw,
                        t = e.animation;
                    e = f(e.axis, {
                        index: this[c].length,
                        isX: "xAxis" === c
                    });
                    var n = m ? new d.ColorAxis(this, e) : new l(this, e);
                    h[c] = a(h[c] || {});
                    h[c].push(e);
                    m && (this.isDirtyLegend = !0, this.axes.forEach(function (a) {
                        a.series = []
                    }), this.series.forEach(function (a) {
                        a.bindAxes();
                        a.isDirtyData = !0
                    }));
                    k(g, !0) && this.redraw(t);
                    return n
                },
                showLoading: function (a) {
                    var c = this,
                        f = c.options,
                        e = c.loadingDiv,
                        d = f.loading,
                        h = function () {
                            e && A(e, {
                                left: c.plotLeft + "px",
                                top: c.plotTop + "px",
                                width: c.plotWidth + "px",
                                height: c.plotHeight + "px"
                            })
                        };
                    e || (c.loadingDiv = e = E("div", {
                        className: "highcharts-loading highcharts-loading-hidden"
                    }, null, c.container), c.loadingSpan = E("span", {
                        className: "highcharts-loading-inner"
                    }, null, e), J(c, "redraw", h));
                    e.className = "highcharts-loading";
                    c.loadingSpan.innerHTML = k(a, f.lang.loading, "");
                    c.styledMode || (A(e, u(d.style, {
                        zIndex: 10
                    })), A(c.loadingSpan, d.labelStyle), c.loadingShown || (A(e, {
                        opacity: 0,
                        display: ""
                    }), M(e, {
                        opacity: d.style.opacity || .5
                    }, {
                        duration: d.showDuration || 0
                    })));
                    c.loadingShown = !0;
                    h()
                },
                hideLoading: function () {
                    var a = this.options,
                        c = this.loadingDiv;
                    c && (c.className = "highcharts-loading highcharts-loading-hidden", this.styledMode || M(c, {
                        opacity: 0
                    }, {
                        duration: a.loading.hideDuration || 100,
                        complete: function () {
                            A(c, {
                                display: "none"
                            })
                        }
                    }));
                    this.loadingShown = !1
                },
                propsRequireDirtyBox: "backgroundColor borderColor borderWidth borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
                propsRequireReflow: "margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft".split(" "),
                propsRequireUpdateSeries: "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip".split(" "),
                collectionsWithUpdate: ["xAxis", "yAxis", "zAxis", "series"],
                update: function (e, h, l, g) {
                    var t = this,
                        q = {
                            credits: "addCredits",
                            title: "setTitle",
                            subtitle: "setSubtitle",
                            caption: "setCaption"
                        },
                        n, b, x, u = e.isResponsiveOptions,
                        z = [];
                    D(t, "update", {
                        options: e
                    });
                    u || t.setResponsive(!1, !0);
                    e = d.cleanRecursively(e, t.options);
                    f(!0, t.userOptions, e);
                    if (n = e.chart) {
                        f(!0, t.options.chart, n);
                        "className" in n && t.setClassName(n.className);
                        "reflow" in n && t.setReflow(n.reflow);
                        if ("inverted" in n || "polar" in n || "type" in n) {
                            t.propFromSeries();
                            var B = !0
                        }
                        "alignTicks" in n && (B = !0);
                        c(n, function (a, c) {
                            -1 !== t.propsRequireUpdateSeries.indexOf("chart." + c) && (b = !0); - 1 !== t.propsRequireDirtyBox.indexOf(c) && (t.isDirtyBox = !0);
                            u || -1 === t.propsRequireReflow.indexOf(c) || (x = !0)
                        });
                        !t.styledMode &&
                            "style" in n && t.renderer.setStyle(n.style)
                    }!t.styledMode && e.colors && (this.options.colors = e.colors);
                    e.plotOptions && f(!0, this.options.plotOptions, e.plotOptions);
                    e.time && this.time === d.time && (this.time = new r(e.time));
                    c(e, function (a, c) {
                        if (t[c] && "function" === typeof t[c].update) t[c].update(a, !1);
                        else if ("function" === typeof t[q[c]]) t[q[c]](a);
                        "chart" !== c && -1 !== t.propsRequireUpdateSeries.indexOf(c) && (b = !0)
                    });
                    this.collectionsWithUpdate.forEach(function (b) {
                        if (e[b]) {
                            if ("series" === b) {
                                var c = [];
                                t[b].forEach(function (a,
                                    b) {
                                    a.options.isInternal || c.push(k(a.options.index, b))
                                })
                            }
                            a(e[b]).forEach(function (a, f) {
                                (f = F(a.id) && t.get(a.id) || t[b][c ? c[f] : f]) && f.coll === b && (f.update(a, !1), l && (f.touched = !0));
                                !f && l && t.collectionsWithInit[b] && (t.collectionsWithInit[b][0].apply(t, [a].concat(t.collectionsWithInit[b][1] || []).concat([!1])).touched = !0)
                            });
                            l && t[b].forEach(function (a) {
                                a.touched || a.options.isInternal ? delete a.touched : z.push(a)
                            })
                        }
                    });
                    z.forEach(function (a) {
                        a.remove && a.remove(!1)
                    });
                    B && t.axes.forEach(function (a) {
                        a.update({}, !1)
                    });
                    b && t.getSeriesOrderByLinks().forEach(function (a) {
                        a.chart && a.update({}, !1)
                    }, this);
                    e.loading && f(!0, t.options.loading, e.loading);
                    B = n && n.width;
                    n = n && n.height;
                    P(n) && (n = m(n, B || t.chartWidth));
                    x || N(B) && B !== t.chartWidth || N(n) && n !== t.chartHeight ? t.setSize(B, n, g) : k(h, !0) && t.redraw(g);
                    D(t, "afterUpdate", {
                        options: e,
                        redraw: h,
                        animation: g
                    })
                },
                setSubtitle: function (a, c) {
                    this.applyDescription("subtitle", a);
                    this.layOutTitles(c)
                },
                setCaption: function (a, c) {
                    this.applyDescription("caption", a);
                    this.layOutTitles(c)
                }
            });
            v.prototype.collectionsWithInit = {
                xAxis: [v.prototype.addAxis, [!0]],
                yAxis: [v.prototype.addAxis, [!1]],
                series: [v.prototype.addSeries]
            };
            u(g.prototype, {
                update: function (a, c, f, e) {
                    function d() {
                        h.applyOptions(a);
                        var e = b && h.hasDummyGraphic;
                        e = null === h.y ? !e : e;
                        b && e && (h.graphic = b.destroy(), delete h.hasDummyGraphic);
                        q(a, !0) && (b && b.element && a && a.marker && "undefined" !== typeof a.marker.symbol && (h.graphic = b.destroy()), a && a.dataLabels && h.dataLabel && (h.dataLabel = h.dataLabel.destroy()), h.connector && (h.connector = h.connector.destroy()));
                        m = h.index;
                        l.updateParallelArrays(h,
                            m);
                        t.data[m] = q(t.data[m], !0) || q(a, !0) ? h.options : k(a, t.data[m]);
                        l.isDirty = l.isDirtyData = !0;
                        !l.fixedBox && l.hasCartesianSeries && (g.isDirtyBox = !0);
                        "point" === t.legendType && (g.isDirtyLegend = !0);
                        c && g.redraw(f)
                    }
                    var h = this,
                        l = h.series,
                        b = h.graphic,
                        m, g = l.chart,
                        t = l.options;
                    c = k(c, !0);
                    !1 === e ? d() : h.firePointEvent("update", {
                        options: a
                    }, d)
                },
                remove: function (a, c) {
                    this.series.removePoint(this.series.data.indexOf(this), a, c)
                }
            });
            u(t.prototype, {
                addPoint: function (a, c, f, e, d) {
                    var h = this.options,
                        l = this.data,
                        b = this.chart,
                        m = this.xAxis;
                    m = m && m.hasNames && m.names;
                    var g = h.data,
                        t = this.xData,
                        q;
                    c = k(c, !0);
                    var x = {
                        series: this
                    };
                    this.pointClass.prototype.applyOptions.apply(x, [a]);
                    var u = x.x;
                    var p = t.length;
                    if (this.requireSorting && u < t[p - 1])
                        for (q = !0; p && t[p - 1] > u;) p--;
                    this.updateParallelArrays(x, "splice", p, 0, 0);
                    this.updateParallelArrays(x, p);
                    m && x.name && (m[u] = x.name);
                    g.splice(p, 0, a);
                    q && (this.data.splice(p, 0, null), this.processData());
                    "point" === h.legendType && this.generatePoints();
                    f && (l[0] && l[0].remove ? l[0].remove(!1) : (l.shift(), this.updateParallelArrays(x,
                        "shift"), g.shift()));
                    !1 !== d && D(this, "addPoint", {
                        point: x
                    });
                    this.isDirtyData = this.isDirty = !0;
                    c && b.redraw(e)
                },
                removePoint: function (a, c, f) {
                    var d = this,
                        h = d.data,
                        l = h[a],
                        m = d.points,
                        b = d.chart,
                        g = function () {
                            m && m.length === h.length && m.splice(a, 1);
                            h.splice(a, 1);
                            d.options.data.splice(a, 1);
                            d.updateParallelArrays(l || {
                                series: d
                            }, "splice", a, 1);
                            l && l.destroy();
                            d.isDirty = !0;
                            d.isDirtyData = !0;
                            c && b.redraw()
                        };
                    e(f, b);
                    c = k(c, !0);
                    l ? l.firePointEvent("remove", null, g) : g()
                },
                remove: function (a, c, f, e) {
                    function d() {
                        h.destroy(e);
                        h.remove =
                            null;
                        l.isDirtyLegend = l.isDirtyBox = !0;
                        l.linkSeries();
                        k(a, !0) && l.redraw(c)
                    }
                    var h = this,
                        l = h.chart;
                    !1 !== f ? D(h, "remove", null, d) : d()
                },
                update: function (a, c) {
                    a = d.cleanRecursively(a, this.userOptions);
                    D(this, "update", {
                        options: a
                    });
                    var e = this,
                        h = e.chart,
                        l = e.userOptions,
                        m = e.initialType || e.type,
                        g = a.type || l.type || h.options.chart.type,
                        b = !(this.hasDerivedData || a.dataGrouping || g && g !== this.type || "undefined" !== typeof a.pointStart || a.pointInterval || a.pointIntervalUnit || a.keys),
                        t = z[m].prototype,
                        q, x = ["group", "markerGroup",
                            "dataLabelsGroup", "transformGroup"
                        ],
                        B = ["eventOptions", "navigatorSeries", "baseSeries"],
                        v = e.finishedAnimating && {
                            animation: !1
                        },
                        r = {};
                    b && (B.push("data", "isDirtyData", "points", "processedXData", "processedYData", "xIncrement", "_hasPointMarkers", "_hasPointLabels", "mapMap", "mapData", "minY", "maxY", "minX", "maxX"), !1 !== a.visible && B.push("area", "graph"), e.parallelArrays.forEach(function (a) {
                        B.push(a + "Data")
                    }), a.data && (a.dataSorting && u(e.options.dataSorting, a.dataSorting), this.setData(a.data, !1)));
                    a = f(l, v, {
                        index: "undefined" ===
                            typeof l.index ? e.index : l.index,
                        pointStart: k(l.pointStart, e.xData[0])
                    }, !b && {
                        data: e.options.data
                    }, a);
                    b && a.data && (a.data = e.options.data);
                    B = x.concat(B);
                    B.forEach(function (a) {
                        B[a] = e[a];
                        delete e[a]
                    });
                    e.remove(!1, null, !1, !0);
                    for (q in t) e[q] = void 0;
                    z[g || m] ? u(e, z[g || m].prototype) : y(17, !0, h, {
                        missingModuleFor: g || m
                    });
                    B.forEach(function (a) {
                        e[a] = B[a]
                    });
                    e.init(h, a);
                    if (b && this.points) {
                        var p = e.options;
                        !1 === p.visible ? (r.graphic = 1, r.dataLabel = 1) : e._hasPointLabels || (g = p.marker, t = p.dataLabels, g && (!1 === g.enabled || "symbol" in
                            g) && (r.graphic = 1), t && !1 === t.enabled && (r.dataLabel = 1));
                        this.points.forEach(function (a) {
                            a && a.series && (a.resolveColor(), Object.keys(r).length && a.destroyElements(r), !1 === p.showInLegend && a.legendItem && h.legend.destroyItem(a))
                        }, this)
                    }
                    a.zIndex !== l.zIndex && x.forEach(function (b) {
                        e[b] && e[b].attr({
                            zIndex: a.zIndex
                        })
                    });
                    e.initialType = m;
                    h.linkSeries();
                    D(this, "afterUpdate");
                    k(c, !0) && h.redraw(b ? void 0 : !1)
                },
                setName: function (a) {
                    this.name = this.options.name = this.userOptions.name = a;
                    this.chart.isDirtyLegend = !0
                }
            });
            u(l.prototype, {
                update: function (a, e) {
                    var d = this.chart,
                        h = a && a.events || {};
                    a = f(this.userOptions, a);
                    d.options[this.coll].indexOf && (d.options[this.coll][d.options[this.coll].indexOf(this.userOptions)] = a);
                    c(d.options[this.coll].events, function (a, c) {
                        "undefined" === typeof h[c] && (h[c] = void 0)
                    });
                    this.destroy(!0);
                    this.init(d, u(a, {
                        events: h
                    }));
                    d.isDirtyBox = !0;
                    k(e, !0) && d.redraw()
                },
                remove: function (a) {
                    for (var c = this.chart, e = this.coll, f = this.series, d = f.length; d--;) f[d] && f[d].remove(!1);
                    L(c.axes, this);
                    L(c[e], this);
                    h(c.options[e]) ?
                        c.options[e].splice(this.options.index, 1) : delete c.options[e];
                    c[e].forEach(function (a, c) {
                        a.options.index = a.userOptions.index = c
                    });
                    this.destroy();
                    c.isDirtyBox = !0;
                    k(a, !0) && c.redraw()
                },
                setTitle: function (a, c) {
                    this.update({
                        title: a
                    }, c)
                },
                setCategories: function (a, c) {
                    this.update({
                        categories: a
                    }, c)
                }
            })
        });
    S(r, "parts/AreaSeries.js", [r["parts/Globals.js"], r["parts/Color.js"], r["mixins/legend-symbol.js"], r["parts/Utilities.js"]], function (d, g, r, v) {
        var J = g.parse,
            M = v.objectEach,
            E = v.pick;
        g = v.seriesType;
        var A = d.Series;
        g("area", "line", {
            softThreshold: !1,
            threshold: 0
        }, {
            singleStacks: !1,
            getStackPoints: function (d) {
                var g = [],
                    r = [],
                    u = this.xAxis,
                    v = this.yAxis,
                    h = v.stacks[this.stackKey],
                    A = {},
                    q = this.index,
                    F = v.series,
                    f = F.length,
                    c = E(v.options.reversedStacks, !0) ? 1 : -1,
                    k;
                d = d || this.points;
                if (this.options.stacking) {
                    for (k = 0; k < d.length; k++) d[k].leftNull = d[k].rightNull = void 0, A[d[k].x] = d[k];
                    M(h, function (c, a) {
                        null !== c.total && r.push(a)
                    });
                    r.sort(function (c, a) {
                        return c - a
                    });
                    var m = F.map(function (c) {
                        return c.visible
                    });
                    r.forEach(function (e, a) {
                        var d =
                            0,
                            t, z;
                        if (A[e] && !A[e].isNull) g.push(A[e]), [-1, 1].forEach(function (d) {
                            var l = 1 === d ? "rightNull" : "leftNull",
                                g = 0,
                                u = h[r[a + d]];
                            if (u)
                                for (k = q; 0 <= k && k < f;) t = u.points[k], t || (k === q ? A[e][l] = !0 : m[k] && (z = h[e].points[k]) && (g -= z[1] - z[0])), k += c;
                            A[e][1 === d ? "rightCliff" : "leftCliff"] = g
                        });
                        else {
                            for (k = q; 0 <= k && k < f;) {
                                if (t = h[e].points[k]) {
                                    d = t[1];
                                    break
                                }
                                k += c
                            }
                            d = v.translate(d, 0, 1, 0, 1);
                            g.push({
                                isNull: !0,
                                plotX: u.translate(e, 0, 0, 0, 1),
                                x: e,
                                plotY: d,
                                yBottom: d
                            })
                        }
                    })
                }
                return g
            },
            getGraphPath: function (d) {
                var g = A.prototype.getGraphPath,
                    r = this.options,
                    u = r.stacking,
                    v = this.yAxis,
                    h, N = [],
                    q = [],
                    F = this.index,
                    f = v.stacks[this.stackKey],
                    c = r.threshold,
                    k = Math.round(v.getThreshold(r.threshold));
                r = E(r.connectNulls, "percent" === u);
                var m = function (e, h, l) {
                    var m = d[e];
                    e = u && f[m.x].points[F];
                    var g = m[l + "Null"] || 0;
                    l = m[l + "Cliff"] || 0;
                    m = !0;
                    if (l || g) {
                        var t = (g ? e[0] : e[1]) + l;
                        var x = e[0] + l;
                        m = !!g
                    } else !u && d[h] && d[h].isNull && (t = x = c);
                    "undefined" !== typeof t && (q.push({
                        plotX: a,
                        plotY: null === t ? k : v.getThreshold(t),
                        isNull: m,
                        isCliff: !0
                    }), N.push({
                        plotX: a,
                        plotY: null === x ? k : v.getThreshold(x),
                        doCurve: !1
                    }))
                };
                d = d || this.points;
                u && (d = this.getStackPoints(d));
                for (h = 0; h < d.length; h++) {
                    u || (d[h].leftCliff = d[h].rightCliff = d[h].leftNull = d[h].rightNull = void 0);
                    var e = d[h].isNull;
                    var a = E(d[h].rectPlotX, d[h].plotX);
                    var l = E(d[h].yBottom, k);
                    if (!e || r) r || m(h, h - 1, "left"), e && !u && r || (q.push(d[h]), N.push({
                        x: h,
                        plotX: a,
                        plotY: l
                    })), r || m(h, h + 1, "right")
                }
                h = g.call(this, q, !0, !0);
                N.reversed = !0;
                e = g.call(this, N, !0, !0);
                e.length && (e[0] = "L");
                e = h.concat(e);
                g = g.call(this, q, !1, r);
                e.xMap = h.xMap;
                this.areaPath = e;
                return g
            },
            drawGraph: function () {
                this.areaPath = [];
                A.prototype.drawGraph.apply(this);
                var d = this,
                    g = this.areaPath,
                    r = this.options,
                    u = [
                        ["area", "highcharts-area", this.color, r.fillColor]
                    ];
                this.zones.forEach(function (g, h) {
                    u.push(["zone-area-" + h, "highcharts-area highcharts-zone-area-" + h + " " + g.className, g.color || d.color, g.fillColor || r.fillColor])
                });
                u.forEach(function (u) {
                    var h = u[0],
                        v = d[h],
                        q = v ? "animate" : "attr",
                        y = {};
                    v ? (v.endX = d.preventGraphAnimation ? null : g.xMap, v.animate({
                        d: g
                    })) : (y.zIndex = 0, v = d[h] = d.chart.renderer.path(g).addClass(u[1]).add(d.group), v.isArea = !0);
                    d.chart.styledMode || (y.fill = E(u[3], J(u[2]).setOpacity(E(r.fillOpacity, .75)).get()));
                    v[q](y);
                    v.startX = g.xMap;
                    v.shiftUnit = r.step ? 2 : 1
                })
            },
            drawLegendSymbol: r.drawRectangle
        });
        ""
    });
    S(r, "parts/SplineSeries.js", [r["parts/Utilities.js"]], function (d) {
        var g = d.pick;
        d = d.seriesType;
        d("spline", "line", {}, {
            getPointSpline: function (d, r, J) {
                var v = r.plotX,
                    E = r.plotY,
                    A = d[J - 1];
                J = d[J + 1];
                if (A && !A.isNull && !1 !== A.doCurve && !r.isCliff && J && !J.isNull && !1 !== J.doCurve && !r.isCliff) {
                    d = A.plotY;
                    var F = J.plotX;
                    J = J.plotY;
                    var L = 0;
                    var y =
                        (1.5 * v + A.plotX) / 2.5;
                    var u = (1.5 * E + d) / 2.5;
                    F = (1.5 * v + F) / 2.5;
                    var D = (1.5 * E + J) / 2.5;
                    F !== y && (L = (D - u) * (F - v) / (F - y) + E - D);
                    u += L;
                    D += L;
                    u > d && u > E ? (u = Math.max(d, E), D = 2 * E - u) : u < d && u < E && (u = Math.min(d, E), D = 2 * E - u);
                    D > J && D > E ? (D = Math.max(J, E), u = 2 * E - D) : D < J && D < E && (D = Math.min(J, E), u = 2 * E - D);
                    r.rightContX = F;
                    r.rightContY = D
                }
                r = ["C", g(A.rightContX, A.plotX), g(A.rightContY, A.plotY), g(y, v), g(u, E), v, E];
                A.rightContX = A.rightContY = null;
                return r
            }
        });
        ""
    });
    S(r, "parts/AreaSplineSeries.js", [r["parts/Globals.js"], r["mixins/legend-symbol.js"], r["parts/Utilities.js"]],
        function (d, g, r) {
            r = r.seriesType;
            var v = d.seriesTypes.area.prototype;
            r("areaspline", "spline", d.defaultPlotOptions.area, {
                getStackPoints: v.getStackPoints,
                getGraphPath: v.getGraphPath,
                drawGraph: v.drawGraph,
                drawLegendSymbol: g.drawRectangle
            });
            ""
        });
    S(r, "parts/ColumnSeries.js", [r["parts/Globals.js"], r["parts/Color.js"], r["mixins/legend-symbol.js"], r["parts/Utilities.js"]], function (d, g, r, v) {
        var J = g.parse,
            M = v.animObject,
            E = v.clamp,
            A = v.defined,
            F = v.extend,
            L = v.isNumber,
            y = v.merge,
            u = v.pick;
        g = v.seriesType;
        var D = d.Series;
        g("column", "line", {
            borderRadius: 0,
            crisp: !0,
            groupPadding: .2,
            marker: null,
            pointPadding: .1,
            minPointLength: 0,
            cropThreshold: 50,
            pointRange: null,
            states: {
                hover: {
                    halo: !1,
                    brightness: .1
                },
                select: {
                    color: "#cccccc",
                    borderColor: "#000000"
                }
            },
            dataLabels: {
                align: null,
                verticalAlign: null,
                y: null
            },
            softThreshold: !1,
            startFromThreshold: !0,
            stickyTracking: !1,
            tooltip: {
                distance: 6
            },
            threshold: 0,
            borderColor: "#ffffff"
        }, {
            cropShoulder: 0,
            directTouch: !0,
            trackerGroups: ["group", "dataLabelsGroup"],
            negStacks: !0,
            init: function () {
                D.prototype.init.apply(this,
                    arguments);
                var d = this,
                    g = d.chart;
                g.hasRendered && g.series.forEach(function (h) {
                    h.type === d.type && (h.isDirty = !0)
                })
            },
            getColumnMetrics: function () {
                var d = this,
                    g = d.options,
                    q = d.xAxis,
                    r = d.yAxis,
                    f = q.options.reversedStacks;
                f = q.reversed && !f || !q.reversed && f;
                var c, k = {},
                    m = 0;
                !1 === g.grouping ? m = 1 : d.chart.series.forEach(function (a) {
                    var e = a.yAxis,
                        f = a.options;
                    if (a.type === d.type && (a.visible || !d.chart.options.chart.ignoreHiddenSeries) && r.len === e.len && r.pos === e.pos) {
                        if (f.stacking) {
                            c = a.stackKey;
                            "undefined" === typeof k[c] && (k[c] =
                                m++);
                            var h = k[c]
                        } else !1 !== f.grouping && (h = m++);
                        a.columnIndex = h
                    }
                });
                var e = Math.min(Math.abs(q.transA) * (q.ordinalSlope || g.pointRange || q.closestPointRange || q.tickInterval || 1), q.len),
                    a = e * g.groupPadding,
                    l = (e - 2 * a) / (m || 1);
                g = Math.min(g.maxPointWidth || q.len, u(g.pointWidth, l * (1 - 2 * g.pointPadding)));
                d.columnMetrics = {
                    width: g,
                    offset: (l - g) / 2 + (a + ((d.columnIndex || 0) + (f ? 1 : 0)) * l - e / 2) * (f ? -1 : 1)
                };
                return d.columnMetrics
            },
            crispCol: function (d, g, q, u) {
                var f = this.chart,
                    c = this.borderWidth,
                    k = -(c % 2 ? .5 : 0);
                c = c % 2 ? .5 : 1;
                f.inverted && f.renderer.isVML &&
                    (c += 1);
                this.options.crisp && (q = Math.round(d + q) + k, d = Math.round(d) + k, q -= d);
                u = Math.round(g + u) + c;
                k = .5 >= Math.abs(g) && .5 < u;
                g = Math.round(g) + c;
                u -= g;
                k && u && (--g, u += 1);
                return {
                    x: d,
                    y: g,
                    width: q,
                    height: u
                }
            },
            translate: function () {
                var d = this,
                    g = d.chart,
                    q = d.options,
                    r = d.dense = 2 > d.closestPointRange * d.xAxis.transA;
                r = d.borderWidth = u(q.borderWidth, r ? 0 : 1);
                var f = d.xAxis,
                    c = d.yAxis,
                    k = q.threshold,
                    m = d.translatedThreshold = c.getThreshold(k),
                    e = u(q.minPointLength, 5),
                    a = d.getColumnMetrics(),
                    l = a.width,
                    t = d.barW = Math.max(l, 1 + 2 * r),
                    z = d.pointXOffset =
                    a.offset,
                    x = d.dataMin,
                    v = d.dataMax;
                g.inverted && (m -= .5);
                q.pointPadding && (t = Math.ceil(t));
                D.prototype.translate.apply(d);
                d.points.forEach(function (a) {
                    var h = u(a.yBottom, m),
                        q = 999 + Math.abs(h),
                        r = l,
                        n = a.plotX;
                    q = E(a.plotY, -q, c.len + q);
                    var b = a.plotX + z,
                        B = t,
                        w = Math.min(q, h),
                        y = Math.max(q, h) - w;
                    if (e && Math.abs(y) < e) {
                        y = e;
                        var H = !c.reversed && !a.negative || c.reversed && a.negative;
                        a.y === k && d.dataMax <= k && c.min < k && x !== v && (H = !H);
                        w = Math.abs(w - m) > e ? h - e : m - (H ? e : 0)
                    }
                    A(a.options.pointWidth) && (r = B = Math.ceil(a.options.pointWidth), b -= Math.round((r -
                        l) / 2));
                    a.barX = b;
                    a.pointWidth = r;
                    a.tooltipPos = g.inverted ? [c.len + c.pos - g.plotLeft - q, f.len + f.pos - g.plotTop - (n || 0) - z - B / 2, y] : [b + B / 2, q + c.pos - g.plotTop, y];
                    a.shapeType = d.pointClass.prototype.shapeType || "rect";
                    a.shapeArgs = d.crispCol.apply(d, a.isNull ? [b, m, B, 0] : [b, w, B, y])
                })
            },
            getSymbol: d.noop,
            drawLegendSymbol: r.drawRectangle,
            drawGraph: function () {
                this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data")
            },
            pointAttribs: function (d, g) {
                var h = this.options,
                    r = this.pointAttrToOptions || {};
                var f = r.stroke ||
                    "borderColor";
                var c = r["stroke-width"] || "borderWidth",
                    k = d && d.color || this.color,
                    m = d && d[f] || h[f] || this.color || k,
                    e = d && d[c] || h[c] || this[c] || 0;
                r = d && d.options.dashStyle || h.dashStyle;
                var a = u(d && d.opacity, h.opacity, 1);
                if (d && this.zones.length) {
                    var l = d.getZone();
                    k = d.options.color || l && (l.color || d.nonZonedColor) || this.color;
                    l && (m = l.borderColor || m, r = l.dashStyle || r, e = l.borderWidth || e)
                }
                g && d && (d = y(h.states[g], d.options.states && d.options.states[g] || {}), g = d.brightness, k = d.color || "undefined" !== typeof g && J(k).brighten(d.brightness).get() ||
                    k, m = d[f] || m, e = d[c] || e, r = d.dashStyle || r, a = u(d.opacity, a));
                f = {
                    fill: k,
                    stroke: m,
                    "stroke-width": e,
                    opacity: a
                };
                r && (f.dashstyle = r);
                return f
            },
            drawPoints: function () {
                var d = this,
                    g = this.chart,
                    q = d.options,
                    u = g.renderer,
                    f = q.animationLimit || 250,
                    c;
                d.points.forEach(function (k) {
                    var h = k.graphic,
                        e = !!h,
                        a = h && g.pointCount < f ? "animate" : "attr";
                    if (L(k.plotY) && null !== k.y) {
                        c = k.shapeArgs;
                        h && k.hasNewShapeType() && (h = h.destroy());
                        d.enabledDataSorting && (k.startXPos = d.xAxis.reversed ? -(c ? c.width : 0) : d.xAxis.width);
                        h || (k.graphic = h = u[k.shapeType](c).add(k.group ||
                            d.group)) && d.enabledDataSorting && g.hasRendered && g.pointCount < f && (h.attr({
                            x: k.startXPos
                        }), e = !0, a = "animate");
                        if (h && e) h[a](y(c));
                        if (q.borderRadius) h[a]({
                            r: q.borderRadius
                        });
                        g.styledMode || h[a](d.pointAttribs(k, k.selected && "select")).shadow(!1 !== k.allowShadow && q.shadow, null, q.stacking && !q.borderRadius);
                        h.addClass(k.getClassName(), !0)
                    } else h && (k.graphic = h.destroy())
                })
            },
            animate: function (d) {
                var h = this,
                    g = this.yAxis,
                    u = h.options,
                    f = this.chart.inverted,
                    c = {},
                    k = f ? "translateX" : "translateY";
                if (d) c.scaleY = .001, d = E(g.toPixels(u.threshold),
                    g.pos, g.pos + g.len), f ? c.translateX = d - g.len : c.translateY = d, h.clipBox && h.setClip(), h.group.attr(c);
                else {
                    var m = h.group.attr(k);
                    h.group.animate({
                        scaleY: 1
                    }, F(M(h.options.animation), {
                        step: function (e, a) {
                            c[k] = m + a.pos * (g.pos - m);
                            h.group.attr(c)
                        }
                    }))
                }
            },
            remove: function () {
                var d = this,
                    g = d.chart;
                g.hasRendered && g.series.forEach(function (h) {
                    h.type === d.type && (h.isDirty = !0)
                });
                D.prototype.remove.apply(d, arguments)
            }
        });
        ""
    });
    S(r, "parts/BarSeries.js", [r["parts/Utilities.js"]], function (d) {
        d = d.seriesType;
        d("bar", "column", null, {
            inverted: !0
        });
        ""
    });
    S(r, "parts/ScatterSeries.js", [r["parts/Globals.js"], r["parts/Utilities.js"]], function (d, g) {
        var r = g.addEvent;
        g = g.seriesType;
        var v = d.Series;
        g("scatter", "line", {
            lineWidth: 0,
            findNearestPointBy: "xy",
            jitter: {
                x: 0,
                y: 0
            },
            marker: {
                enabled: !0
            },
            tooltip: {
                headerFormat: '<span style="color:{point.color}">\u25cf</span> <span style="font-size: 10px"> {series.name}</span><br/>',
                pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>"
            }
        }, {
            sorted: !1,
            requireSorting: !1,
            noSharedTooltip: !0,
            trackerGroups: ["group",
                "markerGroup", "dataLabelsGroup"
            ],
            takeOrdinalPosition: !1,
            drawGraph: function () {
                this.options.lineWidth && v.prototype.drawGraph.call(this)
            },
            applyJitter: function () {
                var d = this,
                    g = this.options.jitter,
                    r = this.points.length;
                g && this.points.forEach(function (v, E) {
                    ["x", "y"].forEach(function (A, y) {
                        var u = "plot" + A.toUpperCase();
                        if (g[A] && !v.isNull) {
                            var D = d[A + "Axis"];
                            var h = g[A] * D.transA;
                            if (D && !D.isLog) {
                                var F = Math.max(0, v[u] - h);
                                D = Math.min(D.len, v[u] + h);
                                y = 1E4 * Math.sin(E + y * r);
                                v[u] = F + (D - F) * (y - Math.floor(y));
                                "x" === A && (v.clientX =
                                    v.plotX)
                            }
                        }
                    })
                })
            }
        });
        r(v, "afterTranslate", function () {
            this.applyJitter && this.applyJitter()
        });
        ""
    });
    S(r, "mixins/centered-series.js", [r["parts/Globals.js"], r["parts/Utilities.js"]], function (d, g) {
        var r = g.isNumber,
            v = g.pick,
            J = g.relativeLength,
            M = d.deg2rad;
        d.CenteredSeriesMixin = {
            getCenter: function () {
                var d = this.options,
                    g = this.chart,
                    r = 2 * (d.slicedOffset || 0),
                    L = g.plotWidth - 2 * r,
                    y = g.plotHeight - 2 * r,
                    u = d.center,
                    D = Math.min(L, y),
                    h = d.size,
                    N = d.innerSize || 0;
                "string" === typeof h && (h = parseFloat(h));
                "string" === typeof N && (N = parseFloat(N));
                d = [v(u[0], "50%"), v(u[1], "50%"), v(h && 0 > h ? void 0 : d.size, "100%"), v(N && 0 > N ? void 0 : d.innerSize || 0, "0%")];
                g.angular && (d[3] = 0);
                for (u = 0; 4 > u; ++u) h = d[u], g = 2 > u || 2 === u && /%$/.test(h), d[u] = J(h, [L, y, D, d[2]][u]) + (g ? r : 0);
                d[3] > d[2] && (d[3] = d[2]);
                return d
            },
            getStartAndEndRadians: function (d, g) {
                d = r(d) ? d : 0;
                g = r(g) && g > d && 360 > g - d ? g : d + 360;
                return {
                    start: M * (d + -90),
                    end: M * (g + -90)
                }
            }
        }
    });
    S(r, "parts/PieSeries.js", [r["parts/Globals.js"], r["mixins/legend-symbol.js"], r["parts/Point.js"], r["parts/Utilities.js"]], function (d, g, r, v) {
        var J =
            v.addEvent,
            M = v.clamp,
            E = v.defined,
            A = v.fireEvent,
            F = v.isNumber,
            L = v.merge,
            y = v.pick,
            u = v.relativeLength,
            D = v.seriesType,
            h = v.setAnimation;
        v = d.CenteredSeriesMixin;
        var N = v.getStartAndEndRadians,
            q = d.noop,
            P = d.Series;
        D("pie", "line", {
            center: [null, null],
            clip: !1,
            colorByPoint: !0,
            dataLabels: {
                allowOverlap: !0,
                connectorPadding: 5,
                connectorShape: "fixedOffset",
                crookDistance: "70%",
                distance: 30,
                enabled: !0,
                formatter: function () {
                    return this.point.isNull ? void 0 : this.point.name
                },
                softConnector: !0,
                x: 0
            },
            fillColor: void 0,
            ignoreHiddenPoint: !0,
            inactiveOtherPoints: !0,
            legendType: "point",
            marker: null,
            size: null,
            showInLegend: !1,
            slicedOffset: 10,
            stickyTracking: !1,
            tooltip: {
                followPointer: !0
            },
            borderColor: "#ffffff",
            borderWidth: 1,
            lineWidth: void 0,
            states: {
                hover: {
                    brightness: .1
                }
            }
        }, {
            isCartesian: !1,
            requireSorting: !1,
            directTouch: !0,
            noSharedTooltip: !0,
            trackerGroups: ["group", "dataLabelsGroup"],
            axisTypes: [],
            pointAttribs: d.seriesTypes.column.prototype.pointAttribs,
            animate: function (f) {
                var c = this,
                    d = c.points,
                    h = c.startAngleRad;
                f || d.forEach(function (e) {
                    var a = e.graphic,
                        f = e.shapeArgs;
                    a && f && (a.attr({
                        r: y(e.startR, c.center && c.center[3] / 2),
                        start: h,
                        end: h
                    }), a.animate({
                        r: f.r,
                        start: f.start,
                        end: f.end
                    }, c.options.animation))
                })
            },
            hasData: function () {
                return !!this.processedXData.length
            },
            updateTotals: function () {
                var f, c = 0,
                    d = this.points,
                    h = d.length,
                    e = this.options.ignoreHiddenPoint;
                for (f = 0; f < h; f++) {
                    var a = d[f];
                    c += e && !a.visible ? 0 : a.isNull ? 0 : a.y
                }
                this.total = c;
                for (f = 0; f < h; f++) a = d[f], a.percentage = 0 < c && (a.visible || !e) ? a.y / c * 100 : 0, a.total = c
            },
            generatePoints: function () {
                P.prototype.generatePoints.call(this);
                this.updateTotals()
            },
            getX: function (f, c, d) {
                var k = this.center,
                    e = this.radii ? this.radii[d.index] : k[2] / 2;
                f = Math.asin(M((f - k[1]) / (e + d.labelDistance), -1, 1));
                return k[0] + (c ? -1 : 1) * Math.cos(f) * (e + d.labelDistance) + (0 < d.labelDistance ? (c ? -1 : 1) * this.options.dataLabels.padding : 0)
            },
            translate: function (f) {
                this.generatePoints();
                var c = 0,
                    d = this.options,
                    h = d.slicedOffset,
                    e = h + (d.borderWidth || 0),
                    a = N(d.startAngle, d.endAngle),
                    g = this.startAngleRad = a.start;
                a = (this.endAngleRad = a.end) - g;
                var t = this.points,
                    q = d.dataLabels.distance;
                d = d.ignoreHiddenPoint;
                var r, v = t.length;
                f || (this.center = f = this.getCenter());
                for (r = 0; r < v; r++) {
                    var H = t[r];
                    var D = g + c * a;
                    if (!d || H.visible) c += H.percentage / 100;
                    var I = g + c * a;
                    H.shapeType = "arc";
                    H.shapeArgs = {
                        x: f[0],
                        y: f[1],
                        r: f[2] / 2,
                        innerR: f[3] / 2,
                        start: Math.round(1E3 * D) / 1E3,
                        end: Math.round(1E3 * I) / 1E3
                    };
                    H.labelDistance = y(H.options.dataLabels && H.options.dataLabels.distance, q);
                    H.labelDistance = u(H.labelDistance, H.shapeArgs.r);
                    this.maxLabelDistance = Math.max(this.maxLabelDistance || 0, H.labelDistance);
                    I = (I + D) / 2;
                    I > 1.5 * Math.PI ?
                        I -= 2 * Math.PI : I < -Math.PI / 2 && (I += 2 * Math.PI);
                    H.slicedTranslation = {
                        translateX: Math.round(Math.cos(I) * h),
                        translateY: Math.round(Math.sin(I) * h)
                    };
                    var K = Math.cos(I) * f[2] / 2;
                    var n = Math.sin(I) * f[2] / 2;
                    H.tooltipPos = [f[0] + .7 * K, f[1] + .7 * n];
                    H.half = I < -Math.PI / 2 || I > Math.PI / 2 ? 1 : 0;
                    H.angle = I;
                    D = Math.min(e, H.labelDistance / 5);
                    H.labelPosition = {
                        natural: {
                            x: f[0] + K + Math.cos(I) * H.labelDistance,
                            y: f[1] + n + Math.sin(I) * H.labelDistance
                        },
                        "final": {},
                        alignment: 0 > H.labelDistance ? "center" : H.half ? "right" : "left",
                        connectorPosition: {
                            breakAt: {
                                x: f[0] +
                                    K + Math.cos(I) * D,
                                y: f[1] + n + Math.sin(I) * D
                            },
                            touchingSliceAt: {
                                x: f[0] + K,
                                y: f[1] + n
                            }
                        }
                    }
                }
                A(this, "afterTranslate")
            },
            drawEmpty: function () {
                var f = this.options;
                if (0 === this.total) {
                    var c = this.center[0];
                    var d = this.center[1];
                    this.graph || (this.graph = this.chart.renderer.circle(c, d, 0).addClass("highcharts-graph").add(this.group));
                    this.graph.animate({
                        "stroke-width": f.borderWidth,
                        cx: c,
                        cy: d,
                        r: this.center[2] / 2,
                        fill: f.fillColor || "none",
                        stroke: f.color || "#cccccc"
                    }, this.options.animation)
                } else this.graph && (this.graph = this.graph.destroy())
            },
            redrawPoints: function () {
                var f = this,
                    c = f.chart,
                    d = c.renderer,
                    h, e, a, g, t = f.options.shadow;
                this.drawEmpty();
                !t || f.shadowGroup || c.styledMode || (f.shadowGroup = d.g("shadow").attr({
                    zIndex: -1
                }).add(f.group));
                f.points.forEach(function (k) {
                    var l = {};
                    e = k.graphic;
                    if (!k.isNull && e) {
                        g = k.shapeArgs;
                        h = k.getTranslate();
                        if (!c.styledMode) {
                            var m = k.shadowGroup;
                            t && !m && (m = k.shadowGroup = d.g("shadow").add(f.shadowGroup));
                            m && m.attr(h);
                            a = f.pointAttribs(k, k.selected && "select")
                        }
                        k.delayedRendering ? (e.setRadialReference(f.center).attr(g).attr(h),
                            c.styledMode || e.attr(a).attr({
                                "stroke-linejoin": "round"
                            }).shadow(t, m), k.delayedRendering = !1) : (e.setRadialReference(f.center), c.styledMode || L(!0, l, a), L(!0, l, g, h), e.animate(l));
                        e.attr({
                            visibility: k.visible ? "inherit" : "hidden"
                        });
                        e.addClass(k.getClassName())
                    } else e && (k.graphic = e.destroy())
                })
            },
            drawPoints: function () {
                var f = this.chart.renderer;
                this.points.forEach(function (c) {
                    c.graphic && c.hasNewShapeType() && (c.graphic = c.graphic.destroy());
                    c.graphic || (c.graphic = f[c.shapeType](c.shapeArgs).add(c.series.group),
                        c.delayedRendering = !0)
                })
            },
            searchPoint: q,
            sortByAngle: function (f, c) {
                f.sort(function (f, d) {
                    return "undefined" !== typeof f.angle && (d.angle - f.angle) * c
                })
            },
            drawLegendSymbol: g.drawRectangle,
            getCenter: v.getCenter,
            getSymbol: q,
            drawGraph: null
        }, {
            init: function () {
                r.prototype.init.apply(this, arguments);
                var f = this;
                f.name = y(f.name, "Slice");
                var c = function (c) {
                    f.slice("select" === c.type)
                };
                J(f, "select", c);
                J(f, "unselect", c);
                return f
            },
            isValid: function () {
                return F(this.y) && 0 <= this.y
            },
            setVisible: function (f, c) {
                var d = this,
                    h = d.series,
                    e = h.chart,
                    a = h.options.ignoreHiddenPoint;
                c = y(c, a);
                f !== d.visible && (d.visible = d.options.visible = f = "undefined" === typeof f ? !d.visible : f, h.options.data[h.data.indexOf(d)] = d.options, ["graphic", "dataLabel", "connector", "shadowGroup"].forEach(function (a) {
                    if (d[a]) d[a][f ? "show" : "hide"](!0)
                }), d.legendItem && e.legend.colorizeItem(d, f), f || "hover" !== d.state || d.setState(""), a && (h.isDirty = !0), c && e.redraw())
            },
            slice: function (f, c, d) {
                var k = this.series;
                h(d, k.chart);
                y(c, !0);
                this.sliced = this.options.sliced = E(f) ? f : !this.sliced;
                k.options.data[k.data.indexOf(this)] = this.options;
                this.graphic.animate(this.getTranslate());
                this.shadowGroup && this.shadowGroup.animate(this.getTranslate())
            },
            getTranslate: function () {
                return this.sliced ? this.slicedTranslation : {
                    translateX: 0,
                    translateY: 0
                }
            },
            haloPath: function (f) {
                var c = this.shapeArgs;
                return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(c.x, c.y, c.r + f, c.r + f, {
                    innerR: c.r - 1,
                    start: c.start,
                    end: c.end
                })
            },
            connectorShapes: {
                fixedOffset: function (f, c, d) {
                    var k = c.breakAt;
                    c = c.touchingSliceAt;
                    return ["M", f.x, f.y].concat(d.softConnector ? ["C", f.x + ("left" === f.alignment ? -5 : 5), f.y, 2 * k.x - c.x, 2 * k.y - c.y, k.x, k.y] : ["L", k.x, k.y]).concat(["L", c.x, c.y])
                },
                straight: function (f, c) {
                    c = c.touchingSliceAt;
                    return ["M", f.x, f.y, "L", c.x, c.y]
                },
                crookedLine: function (f, c, d) {
                    c = c.touchingSliceAt;
                    var k = this.series,
                        e = k.center[0],
                        a = k.chart.plotWidth,
                        h = k.chart.plotLeft;
                    k = f.alignment;
                    var g = this.shapeArgs.r;
                    d = u(d.crookDistance, 1);
                    d = "left" === k ? e + g + (a + h - e - g) * (1 - d) : h + (e - g) * d;
                    e = ["L", d, f.y];
                    if ("left" === k ? d > f.x || d < c.x : d < f.x || d > c.x) e = [];
                    return ["M", f.x, f.y].concat(e).concat(["L", c.x, c.y])
                }
            },
            getConnectorPath: function () {
                var f = this.labelPosition,
                    c = this.series.options.dataLabels,
                    d = c.connectorShape,
                    h = this.connectorShapes;
                h[d] && (d = h[d]);
                return d.call(this, {
                    x: f.final.x,
                    y: f.final.y,
                    alignment: f.alignment
                }, f.connectorPosition, c)
            }
        });
        ""
    });
    S(r, "parts/DataLabels.js", [r["parts/Globals.js"], r["parts/Utilities.js"]], function (d, g) {
        var r = g.animObject,
            v = g.arrayMax,
            J = g.clamp,
            M = g.defined,
            E = g.extend,
            A = g.format,
            F = g.isArray,
            L = g.merge,
            y = g.objectEach,
            u =
            g.pick,
            D = g.relativeLength,
            h = g.splat,
            N = g.stableSort;
        g = d.noop;
        var q = d.Series,
            P = d.seriesTypes;
        d.distribute = function (f, c, k) {
            function h(a, c) {
                return a.target - c.target
            }
            var e, a = !0,
                g = f,
                t = [];
            var q = 0;
            var r = g.reducedLen || c;
            for (e = f.length; e--;) q += f[e].size;
            if (q > r) {
                N(f, function (a, c) {
                    return (c.rank || 0) - (a.rank || 0)
                });
                for (q = e = 0; q <= r;) q += f[e].size, e++;
                t = f.splice(e - 1, f.length)
            }
            N(f, h);
            for (f = f.map(function (a) {
                    return {
                        size: a.size,
                        targets: [a.target],
                        align: u(a.align, .5)
                    }
                }); a;) {
                for (e = f.length; e--;) a = f[e], q = (Math.min.apply(0,
                    a.targets) + Math.max.apply(0, a.targets)) / 2, a.pos = J(q - a.size * a.align, 0, c - a.size);
                e = f.length;
                for (a = !1; e--;) 0 < e && f[e - 1].pos + f[e - 1].size > f[e].pos && (f[e - 1].size += f[e].size, f[e - 1].targets = f[e - 1].targets.concat(f[e].targets), f[e - 1].align = .5, f[e - 1].pos + f[e - 1].size > c && (f[e - 1].pos = c - f[e - 1].size), f.splice(e, 1), a = !0)
            }
            g.push.apply(g, t);
            e = 0;
            f.some(function (a) {
                var f = 0;
                if (a.targets.some(function () {
                        g[e].pos = a.pos + f;
                        if ("undefined" !== typeof k && Math.abs(g[e].pos - g[e].target) > k) return g.slice(0, e + 1).forEach(function (a) {
                                delete a.pos
                            }),
                            g.reducedLen = (g.reducedLen || c) - .1 * c, g.reducedLen > .1 * c && d.distribute(g, c, k), !0;
                        f += g[e].size;
                        e++
                    })) return !0
            });
            N(g, h)
        };
        q.prototype.drawDataLabels = function () {
            function f(a, c) {
                var b = c.filter;
                return b ? (c = b.operator, a = a[b.property], b = b.value, ">" === c && a > b || "<" === c && a < b || ">=" === c && a >= b || "<=" === c && a <= b || "==" === c && a == b || "===" === c && a === b ? !0 : !1) : !0
            }

            function c(a, c) {
                var b = [],
                    f;
                if (F(a) && !F(c)) b = a.map(function (a) {
                    return L(a, c)
                });
                else if (F(c) && !F(a)) b = c.map(function (b) {
                    return L(a, b)
                });
                else if (F(a) || F(c))
                    for (f = Math.max(a.length,
                            c.length); f--;) b[f] = L(a[f], c[f]);
                else b = L(a, c);
                return b
            }
            var k = this,
                g = k.chart,
                e = k.options,
                a = e.dataLabels,
                l = k.points,
                t, q = k.hasRendered || 0,
                x = r(e.animation).duration,
                v = Math.min(x, 200),
                H = !g.renderer.forExport && u(a.defer, 0 < v),
                D = g.renderer;
            a = c(c(g.options.plotOptions && g.options.plotOptions.series && g.options.plotOptions.series.dataLabels, g.options.plotOptions && g.options.plotOptions[k.type] && g.options.plotOptions[k.type].dataLabels), a);
            d.fireEvent(this, "drawDataLabels");
            if (F(a) || a.enabled || k._hasPointLabels) {
                var I =
                    k.plotGroup("dataLabelsGroup", "data-labels", H && !q ? "hidden" : "inherit", a.zIndex || 6);
                H && (I.attr({
                    opacity: +q
                }), q || setTimeout(function () {
                    var a = k.dataLabelsGroup;
                    a && (k.visible && I.show(!0), a[e.animation ? "animate" : "attr"]({
                        opacity: 1
                    }, {
                        duration: v
                    }))
                }, x - v));
                l.forEach(function (d) {
                    t = h(c(a, d.dlOptions || d.options && d.options.dataLabels));
                    t.forEach(function (a, b) {
                        var c = a.enabled && (!d.isNull || d.dataLabelOnNull) && f(d, a),
                            h = d.dataLabels ? d.dataLabels[b] : d.dataLabel,
                            l = d.connectors ? d.connectors[b] : d.connector,
                            m = u(a.distance,
                                d.labelDistance),
                            t = !h;
                        if (c) {
                            var n = d.getLabelConfig();
                            var p = u(a[d.formatPrefix + "Format"], a.format);
                            n = M(p) ? A(p, n, g) : (a[d.formatPrefix + "Formatter"] || a.formatter).call(n, a);
                            p = a.style;
                            var q = a.rotation;
                            g.styledMode || (p.color = u(a.color, p.color, k.color, "#000000"), "contrast" === p.color ? (d.contrastColor = D.getContrast(d.color || k.color), p.color = !M(m) && a.inside || 0 > m || e.stacking ? d.contrastColor : "#000000") : delete d.contrastColor, e.cursor && (p.cursor = e.cursor));
                            var r = {
                                r: a.borderRadius || 0,
                                rotation: q,
                                padding: a.padding,
                                zIndex: 1
                            };
                            g.styledMode || (r.fill = a.backgroundColor, r.stroke = a.borderColor, r["stroke-width"] = a.borderWidth);
                            y(r, function (a, b) {
                                "undefined" === typeof a && delete r[b]
                            })
                        }!h || c && M(n) ? c && M(n) && (h ? r.text = n : (d.dataLabels = d.dataLabels || [], h = d.dataLabels[b] = q ? D.text(n, 0, -9999, a.useHTML).addClass("highcharts-data-label") : D.label(n, 0, -9999, a.shape, null, null, a.useHTML, null, "data-label"), b || (d.dataLabel = h), h.addClass(" highcharts-data-label-color-" + d.colorIndex + " " + (a.className || "") + (a.useHTML ? " highcharts-tracker" :
                            ""))), h.options = a, h.attr(r), g.styledMode || h.css(p).shadow(a.shadow), h.added || h.add(I), a.textPath && !a.useHTML && (h.setTextPath(d.getDataLabelPath && d.getDataLabelPath(h) || d.graphic, a.textPath), d.dataLabelPath && !a.textPath.enabled && (d.dataLabelPath = d.dataLabelPath.destroy())), k.alignDataLabel(d, h, a, null, t)) : (d.dataLabel = d.dataLabel && d.dataLabel.destroy(), d.dataLabels && (1 === d.dataLabels.length ? delete d.dataLabels : delete d.dataLabels[b]), b || delete d.dataLabel, l && (d.connector = d.connector.destroy(), d.connectors &&
                            (1 === d.connectors.length ? delete d.connectors : delete d.connectors[b])))
                    })
                })
            }
            d.fireEvent(this, "afterDrawDataLabels")
        };
        q.prototype.alignDataLabel = function (d, c, h, g, e) {
            var a = this,
                f = this.chart,
                k = this.isCartesian && f.inverted,
                m = this.enabledDataSorting,
                q = u(d.dlBox && d.dlBox.centerX, d.plotX, -9999),
                r = u(d.plotY, -9999),
                v = c.getBBox(),
                y = h.rotation,
                A = h.align,
                K = f.isInsidePlot(q, Math.round(r), k),
                n = "justify" === u(h.overflow, m ? "none" : "justify"),
                b = this.visible && !1 !== d.visible && (d.series.forceDL || m && !n || K || h.inside && g &&
                    f.isInsidePlot(q, k ? g.x + 1 : g.y + g.height - 1, k));
            var C = function (b) {
                m && a.xAxis && !n && a.setDataLabelStartPos(d, c, e, K, b)
            };
            if (b) {
                var w = f.renderer.fontMetrics(f.styledMode ? void 0 : h.style.fontSize, c).b;
                g = E({
                    x: k ? this.yAxis.len - r : q,
                    y: Math.round(k ? this.xAxis.len - q : r),
                    width: 0,
                    height: 0
                }, g);
                E(h, {
                    width: v.width,
                    height: v.height
                });
                y ? (n = !1, q = f.renderer.rotCorr(w, y), q = {
                        x: g.x + h.x + g.width / 2 + q.x,
                        y: g.y + h.y + {
                            top: 0,
                            middle: .5,
                            bottom: 1
                        } [h.verticalAlign] * g.height
                    }, C(q), c[e ? "attr" : "animate"](q).attr({
                        align: A
                    }), C = (y + 720) % 360, C = 180 <
                    C && 360 > C, "left" === A ? q.y -= C ? v.height : 0 : "center" === A ? (q.x -= v.width / 2, q.y -= v.height / 2) : "right" === A && (q.x -= v.width, q.y -= C ? 0 : v.height), c.placed = !0, c.alignAttr = q) : (C(g), c.align(h, null, g), q = c.alignAttr);
                n && 0 <= g.height ? this.justifyDataLabel(c, h, q, v, g, e) : u(h.crop, !0) && (b = f.isInsidePlot(q.x, q.y) && f.isInsidePlot(q.x + v.width, q.y + v.height));
                if (h.shape && !y) c[e ? "attr" : "animate"]({
                    anchorX: k ? f.plotWidth - d.plotY : d.plotX,
                    anchorY: k ? f.plotHeight - d.plotX : d.plotY
                })
            }
            e && m && (c.placed = !1);
            b || m && !n || (c.hide(!0), c.placed = !1)
        };
        q.prototype.setDataLabelStartPos = function (d, c, h, g, e) {
            var a = this.chart,
                f = a.inverted,
                k = this.xAxis,
                m = k.reversed,
                q = f ? c.height / 2 : c.width / 2;
            d = (d = d.pointWidth) ? d / 2 : 0;
            k = f ? e.x : m ? -q - d : k.width - q + d;
            e = f ? m ? this.yAxis.height - q + d : -q - d : e.y;
            c.startXPos = k;
            c.startYPos = e;
            g ? "hidden" === c.visibility && (c.show(), c.attr({
                opacity: 0
            }).animate({
                opacity: 1
            })) : c.attr({
                opacity: 1
            }).animate({
                opacity: 0
            }, void 0, c.hide);
            a.hasRendered && (h && c.attr({
                x: c.startXPos,
                y: c.startYPos
            }), c.placed = !0)
        };
        q.prototype.justifyDataLabel = function (d, c, h, g,
            e, a) {
            var f = this.chart,
                k = c.align,
                m = c.verticalAlign,
                q = d.box ? 0 : d.padding || 0;
            var r = h.x + q;
            if (0 > r) {
                "right" === k ? (c.align = "left", c.inside = !0) : c.x = -r;
                var u = !0
            }
            r = h.x + g.width - q;
            r > f.plotWidth && ("left" === k ? (c.align = "right", c.inside = !0) : c.x = f.plotWidth - r, u = !0);
            r = h.y + q;
            0 > r && ("bottom" === m ? (c.verticalAlign = "top", c.inside = !0) : c.y = -r, u = !0);
            r = h.y + g.height - q;
            r > f.plotHeight && ("top" === m ? (c.verticalAlign = "bottom", c.inside = !0) : c.y = f.plotHeight - r, u = !0);
            u && (d.placed = !a, d.align(c, null, e));
            return u
        };
        P.pie && (P.pie.prototype.dataLabelPositioners = {
            radialDistributionY: function (d) {
                return d.top + d.distributeBox.pos
            },
            radialDistributionX: function (d, c, h, g) {
                return d.getX(h < c.top + 2 || h > c.bottom - 2 ? g : h, c.half, c)
            },
            justify: function (d, c, h) {
                return h[0] + (d.half ? -1 : 1) * (c + d.labelDistance)
            },
            alignToPlotEdges: function (d, c, h, g) {
                d = d.getBBox().width;
                return c ? d + g : h - d - g
            },
            alignToConnectors: function (d, c, h, g) {
                var e = 0,
                    a;
                d.forEach(function (c) {
                    a = c.dataLabel.getBBox().width;
                    a > e && (e = a)
                });
                return c ? e + g : h - e - g
            }
        }, P.pie.prototype.drawDataLabels = function () {
            var f = this,
                c = f.data,
                h, g =
                f.chart,
                e = f.options.dataLabels || {},
                a = e.connectorPadding,
                l, t = g.plotWidth,
                r = g.plotHeight,
                x = g.plotLeft,
                B = Math.round(g.chartWidth / 3),
                y, A = f.center,
                D = A[2] / 2,
                K = A[1],
                n, b, C, w, F = [
                    [],
                    []
                ],
                E, N, J, p, P = [0, 0, 0, 0],
                S = f.dataLabelPositioners,
                W;
            f.visible && (e.enabled || f._hasPointLabels) && (c.forEach(function (a) {
                a.dataLabel && a.visible && a.dataLabel.shortened && (a.dataLabel.attr({
                    width: "auto"
                }).css({
                    width: "auto",
                    textOverflow: "clip"
                }), a.dataLabel.shortened = !1)
            }), q.prototype.drawDataLabels.apply(f), c.forEach(function (a) {
                a.dataLabel &&
                    (a.visible ? (F[a.half].push(a), a.dataLabel._pos = null, !M(e.style.width) && !M(a.options.dataLabels && a.options.dataLabels.style && a.options.dataLabels.style.width) && a.dataLabel.getBBox().width > B && (a.dataLabel.css({
                        width: .7 * B
                    }), a.dataLabel.shortened = !0)) : (a.dataLabel = a.dataLabel.destroy(), a.dataLabels && 1 === a.dataLabels.length && delete a.dataLabels))
            }), F.forEach(function (c, k) {
                var l = c.length,
                    m = [],
                    q;
                if (l) {
                    f.sortByAngle(c, k - .5);
                    if (0 < f.maxLabelDistance) {
                        var v = Math.max(0, K - D - f.maxLabelDistance);
                        var z = Math.min(K +
                            D + f.maxLabelDistance, g.plotHeight);
                        c.forEach(function (a) {
                            0 < a.labelDistance && a.dataLabel && (a.top = Math.max(0, K - D - a.labelDistance), a.bottom = Math.min(K + D + a.labelDistance, g.plotHeight), q = a.dataLabel.getBBox().height || 21, a.distributeBox = {
                                target: a.labelPosition.natural.y - a.top + q / 2,
                                size: q,
                                rank: a.y
                            }, m.push(a.distributeBox))
                        });
                        v = z + q - v;
                        d.distribute(m, v, v / 5)
                    }
                    for (p = 0; p < l; p++) {
                        h = c[p];
                        C = h.labelPosition;
                        n = h.dataLabel;
                        J = !1 === h.visible ? "hidden" : "inherit";
                        N = v = C.natural.y;
                        m && M(h.distributeBox) && ("undefined" === typeof h.distributeBox.pos ?
                            J = "hidden" : (w = h.distributeBox.size, N = S.radialDistributionY(h)));
                        delete h.positionIndex;
                        if (e.justify) E = S.justify(h, D, A);
                        else switch (e.alignTo) {
                            case "connectors":
                                E = S.alignToConnectors(c, k, t, x);
                                break;
                            case "plotEdges":
                                E = S.alignToPlotEdges(n, k, t, x);
                                break;
                            default:
                                E = S.radialDistributionX(f, h, N, v)
                        }
                        n._attr = {
                            visibility: J,
                            align: C.alignment
                        };
                        W = h.options.dataLabels || {};
                        n._pos = {
                            x: E + u(W.x, e.x) + ({
                                left: a,
                                right: -a
                            } [C.alignment] || 0),
                            y: N + u(W.y, e.y) - 10
                        };
                        C.final.x = E;
                        C.final.y = N;
                        u(e.crop, !0) && (b = n.getBBox().width, v = null,
                            E - b < a && 1 === k ? (v = Math.round(b - E + a), P[3] = Math.max(v, P[3])) : E + b > t - a && 0 === k && (v = Math.round(E + b - t + a), P[1] = Math.max(v, P[1])), 0 > N - w / 2 ? P[0] = Math.max(Math.round(-N + w / 2), P[0]) : N + w / 2 > r && (P[2] = Math.max(Math.round(N + w / 2 - r), P[2])), n.sideOverflow = v)
                    }
                }
            }), 0 === v(P) || this.verifyDataLabelOverflow(P)) && (this.placeDataLabels(), this.points.forEach(function (a) {
                W = L(e, a.options.dataLabels);
                if (l = u(W.connectorWidth, 1)) {
                    var b;
                    y = a.connector;
                    if ((n = a.dataLabel) && n._pos && a.visible && 0 < a.labelDistance) {
                        J = n._attr.visibility;
                        if (b = !y) a.connector =
                            y = g.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-" + a.colorIndex + (a.className ? " " + a.className : "")).add(f.dataLabelsGroup), g.styledMode || y.attr({
                                "stroke-width": l,
                                stroke: W.connectorColor || a.color || "#666666"
                            });
                        y[b ? "attr" : "animate"]({
                            d: a.getConnectorPath()
                        });
                        y.attr("visibility", J)
                    } else y && (a.connector = y.destroy())
                }
            }))
        }, P.pie.prototype.placeDataLabels = function () {
            this.points.forEach(function (d) {
                var c = d.dataLabel,
                    f;
                c && d.visible && ((f = c._pos) ? (c.sideOverflow && (c._attr.width = Math.max(c.getBBox().width -
                    c.sideOverflow, 0), c.css({
                    width: c._attr.width + "px",
                    textOverflow: (this.options.dataLabels.style || {}).textOverflow || "ellipsis"
                }), c.shortened = !0), c.attr(c._attr), c[c.moved ? "animate" : "attr"](f), c.moved = !0) : c && c.attr({
                    y: -9999
                }));
                delete d.distributeBox
            }, this)
        }, P.pie.prototype.alignDataLabel = g, P.pie.prototype.verifyDataLabelOverflow = function (d) {
            var c = this.center,
                f = this.options,
                h = f.center,
                e = f.minSize || 80,
                a = null !== f.size;
            if (!a) {
                if (null !== h[0]) var g = Math.max(c[2] - Math.max(d[1], d[3]), e);
                else g = Math.max(c[2] -
                    d[1] - d[3], e), c[0] += (d[3] - d[1]) / 2;
                null !== h[1] ? g = J(g, e, c[2] - Math.max(d[0], d[2])) : (g = J(g, e, c[2] - d[0] - d[2]), c[1] += (d[0] - d[2]) / 2);
                g < c[2] ? (c[2] = g, c[3] = Math.min(D(f.innerSize || 0, g), g), this.translate(c), this.drawDataLabels && this.drawDataLabels()) : a = !0
            }
            return a
        });
        P.column && (P.column.prototype.alignDataLabel = function (d, c, h, g, e) {
            var a = this.chart.inverted,
                f = d.series,
                k = d.dlBox || d.shapeArgs,
                m = u(d.below, d.plotY > u(this.translatedThreshold, f.yAxis.len)),
                r = u(h.inside, !!this.options.stacking);
            k && (g = L(k), 0 > g.y && (g.height +=
                g.y, g.y = 0), k = g.y + g.height - f.yAxis.len, 0 < k && k < g.height && (g.height -= k), a && (g = {
                x: f.yAxis.len - g.y - g.height,
                y: f.xAxis.len - g.x - g.width,
                width: g.height,
                height: g.width
            }), r || (a ? (g.x += m ? 0 : g.width, g.width = 0) : (g.y += m ? g.height : 0, g.height = 0)));
            h.align = u(h.align, !a || r ? "center" : m ? "right" : "left");
            h.verticalAlign = u(h.verticalAlign, a || r ? "middle" : m ? "top" : "bottom");
            q.prototype.alignDataLabel.call(this, d, c, h, g, e);
            h.inside && d.contrastColor && c.css({
                color: d.contrastColor
            })
        })
    });
    S(r, "modules/overlapping-datalabels.src.js", [r["parts/Globals.js"],
        r["parts/Utilities.js"]
    ], function (d, g) {
        var r = g.addEvent,
            v = g.fireEvent,
            J = g.isArray,
            M = g.objectEach,
            E = g.pick;
        d = d.Chart;
        r(d, "render", function () {
            var d = [];
            (this.labelCollectors || []).forEach(function (g) {
                d = d.concat(g())
            });
            (this.yAxis || []).forEach(function (g) {
                g.options.stackLabels && !g.options.stackLabels.allowOverlap && M(g.stacks, function (g) {
                    M(g, function (g) {
                        d.push(g.label)
                    })
                })
            });
            (this.series || []).forEach(function (g) {
                var r = g.options.dataLabels;
                g.visible && (!1 !== r.enabled || g._hasPointLabels) && (g.nodes || g.points).forEach(function (g) {
                    g.visible &&
                        (J(g.dataLabels) ? g.dataLabels : g.dataLabel ? [g.dataLabel] : []).forEach(function (r) {
                            var u = r.options;
                            r.labelrank = E(u.labelrank, g.labelrank, g.shapeArgs && g.shapeArgs.height);
                            u.allowOverlap || d.push(r)
                        })
                })
            });
            this.hideOverlappingLabels(d)
        });
        d.prototype.hideOverlappingLabels = function (d) {
            var g = this,
                r = d.length,
                y = g.renderer,
                u, A, h, E = !1;
            var q = function (c) {
                var d = c.box ? 0 : c.padding || 0;
                var f = 0;
                if (c && (!c.alignAttr || c.placed)) {
                    var e = c.alignAttr || {
                        x: c.attr("x"),
                        y: c.attr("y")
                    };
                    var a = c.parentGroup;
                    c.width || (f = c.getBBox(),
                        c.width = f.width, c.height = f.height, f = y.fontMetrics(null, c.element).h);
                    return {
                        x: e.x + (a.translateX || 0) + d,
                        y: e.y + (a.translateY || 0) + d - f,
                        width: c.width - 2 * d,
                        height: c.height - 2 * d
                    }
                }
            };
            for (A = 0; A < r; A++)
                if (u = d[A]) u.oldOpacity = u.opacity, u.newOpacity = 1, u.absoluteBox = q(u);
            d.sort(function (c, d) {
                return (d.labelrank || 0) - (c.labelrank || 0)
            });
            for (A = 0; A < r; A++) {
                var J = (q = d[A]) && q.absoluteBox;
                for (u = A + 1; u < r; ++u) {
                    var f = (h = d[u]) && h.absoluteBox;
                    !J || !f || q === h || 0 === q.newOpacity || 0 === h.newOpacity || f.x > J.x + J.width || f.x + f.width < J.x || f.y >
                        J.y + J.height || f.y + f.height < J.y || ((q.labelrank < h.labelrank ? q : h).newOpacity = 0)
                }
            }
            d.forEach(function (c) {
                var d;
                if (c) {
                    var f = c.newOpacity;
                    c.oldOpacity !== f && (c.alignAttr && c.placed ? (f ? c.show(!0) : d = function () {
                        c.hide(!0);
                        c.placed = !1
                    }, E = !0, c.alignAttr.opacity = f, c[c.isOld ? "animate" : "attr"](c.alignAttr, null, d), v(g, "afterHideOverlappingLabel")) : c.attr({
                        opacity: f
                    }));
                    c.isOld = !0
                }
            });
            E && v(g, "afterHideAllOverlappingLabels")
        }
    });
    S(r, "parts/Interaction.js", [r["parts/Globals.js"], r["parts/Legend.js"], r["parts/Point.js"],
        r["parts/Utilities.js"]
    ], function (d, g, r, v) {
        var J = v.addEvent,
            M = v.createElement,
            E = v.css,
            A = v.defined,
            F = v.extend,
            L = v.fireEvent,
            y = v.isArray,
            u = v.isFunction,
            D = v.isObject,
            h = v.merge,
            N = v.objectEach,
            q = v.pick;
        v = d.Chart;
        var P = d.defaultOptions,
            f = d.defaultPlotOptions,
            c = d.hasTouch,
            k = d.Series,
            m = d.seriesTypes,
            e = d.svg;
        d = d.TrackerMixin = {
            drawTrackerPoint: function () {
                var a = this,
                    d = a.chart,
                    e = d.pointer,
                    f = function (a) {
                        var c = e.getPointFromEvent(a);
                        "undefined" !== typeof c && (e.isDirectTouch = !0, c.onMouseOver(a))
                    },
                    g;
                a.points.forEach(function (a) {
                    g =
                        y(a.dataLabels) ? a.dataLabels : a.dataLabel ? [a.dataLabel] : [];
                    a.graphic && (a.graphic.element.point = a);
                    g.forEach(function (c) {
                        c.div ? c.div.point = a : c.element.point = a
                    })
                });
                a._hasTracking || (a.trackerGroups.forEach(function (g) {
                    if (a[g]) {
                        a[g].addClass("highcharts-tracker").on("mouseover", f).on("mouseout", function (a) {
                            e.onTrackerMouseOut(a)
                        });
                        if (c) a[g].on("touchstart", f);
                        !d.styledMode && a.options.cursor && a[g].css(E).css({
                            cursor: a.options.cursor
                        })
                    }
                }), a._hasTracking = !0);
                L(this, "afterDrawTracker")
            },
            drawTrackerGraph: function () {
                var a =
                    this,
                    d = a.options,
                    f = d.trackByArea,
                    g = [].concat(f ? a.areaPath : a.graphPath),
                    h = g.length,
                    k = a.chart,
                    m = k.pointer,
                    q = k.renderer,
                    r = k.options.tooltip.snap,
                    u = a.tracker,
                    n, b = function (b) {
                        m.normalize(b);
                        if (k.hoverSeries !== a && !m.isStickyTooltip(b)) a.onMouseOver()
                    },
                    v = "rgba(192,192,192," + (e ? .0001 : .002) + ")";
                if (h && !f)
                    for (n = h + 1; n--;) "M" === g[n] && g.splice(n + 1, 0, g[n + 1] - r, g[n + 2], "L"), (n && "M" === g[n] || n === h) && g.splice(n, 0, "L", g[n - 2] + r, g[n - 1]);
                u ? u.attr({
                    d: g
                }) : a.graph && (a.tracker = q.path(g).attr({
                    visibility: a.visible ? "visible" : "hidden",
                    zIndex: 2
                }).addClass(f ? "highcharts-tracker-area" : "highcharts-tracker-line").add(a.group), k.styledMode || a.tracker.attr({
                    "stroke-linejoin": "round",
                    stroke: v,
                    fill: f ? v : "none",
                    "stroke-width": a.graph.strokeWidth() + (f ? 0 : 2 * r)
                }), [a.tracker, a.markerGroup].forEach(function (a) {
                    a.addClass("highcharts-tracker").on("mouseover", b).on("mouseout", function (a) {
                        m.onTrackerMouseOut(a)
                    });
                    d.cursor && !k.styledMode && a.css({
                        cursor: d.cursor
                    });
                    if (c) a.on("touchstart", b)
                }));
                L(this, "afterDrawTracker")
            }
        };
        m.column && (m.column.prototype.drawTracker =
            d.drawTrackerPoint);
        m.pie && (m.pie.prototype.drawTracker = d.drawTrackerPoint);
        m.scatter && (m.scatter.prototype.drawTracker = d.drawTrackerPoint);
        F(g.prototype, {
            setItemEvents: function (a, c, d) {
                var e = this,
                    f = e.chart.renderer.boxWrapper,
                    g = a instanceof r,
                    k = "highcharts-legend-" + (g ? "point" : "series") + "-active",
                    l = e.chart.styledMode;
                (d ? [c, a.legendSymbol] : [a.legendGroup]).forEach(function (d) {
                    if (d) d.on("mouseover", function () {
                        a.visible && e.allItems.forEach(function (c) {
                            a !== c && c.setState("inactive", !g)
                        });
                        a.setState("hover");
                        a.visible && f.addClass(k);
                        l || c.css(e.options.itemHoverStyle)
                    }).on("mouseout", function () {
                        e.chart.styledMode || c.css(h(a.visible ? e.itemStyle : e.itemHiddenStyle));
                        e.allItems.forEach(function (c) {
                            a !== c && c.setState("", !g)
                        });
                        f.removeClass(k);
                        a.setState()
                    }).on("click", function (c) {
                        var d = function () {
                            a.setVisible && a.setVisible();
                            e.allItems.forEach(function (b) {
                                a !== b && b.setState(a.visible ? "inactive" : "", !g)
                            })
                        };
                        f.removeClass(k);
                        c = {
                            browserEvent: c
                        };
                        a.firePointEvent ? a.firePointEvent("legendItemClick", c, d) : L(a, "legendItemClick",
                            c, d)
                    })
                })
            },
            createCheckboxForItem: function (a) {
                a.checkbox = M("input", {
                    type: "checkbox",
                    className: "highcharts-legend-checkbox",
                    checked: a.selected,
                    defaultChecked: a.selected
                }, this.options.itemCheckboxStyle, this.chart.container);
                J(a.checkbox, "click", function (c) {
                    L(a.series || a, "checkboxClick", {
                        checked: c.target.checked,
                        item: a
                    }, function () {
                        a.select()
                    })
                })
            }
        });
        F(v.prototype, {
            showResetZoom: function () {
                function a() {
                    c.zoomOut()
                }
                var c = this,
                    d = P.lang,
                    e = c.options.chart.resetZoomButton,
                    f = e.theme,
                    g = f.states,
                    h = "chart" === e.relativeTo ||
                    "spaceBox" === e.relativeTo ? null : "plotBox";
                L(this, "beforeShowResetZoom", null, function () {
                    c.resetZoomButton = c.renderer.button(d.resetZoom, null, null, a, f, g && g.hover).attr({
                        align: e.position.align,
                        title: d.resetZoomTitle
                    }).addClass("highcharts-reset-zoom").add().align(e.position, !1, h)
                });
                L(this, "afterShowResetZoom")
            },
            zoomOut: function () {
                L(this, "selection", {
                    resetSelection: !0
                }, this.zoom)
            },
            zoom: function (a) {
                var c = this,
                    d, e = c.pointer,
                    f = !1,
                    g = c.inverted ? e.mouseDownX : e.mouseDownY;
                !a || a.resetSelection ? (c.axes.forEach(function (a) {
                    d =
                        a.zoom()
                }), e.initiated = !1) : a.xAxis.concat(a.yAxis).forEach(function (a) {
                    var h = a.axis,
                        k = c.inverted ? h.left : h.top,
                        l = c.inverted ? k + h.width : k + h.height,
                        b = h.isXAxis,
                        m = !1;
                    if (!b && g >= k && g <= l || b || !A(g)) m = !0;
                    e[b ? "zoomX" : "zoomY"] && m && (d = h.zoom(a.min, a.max), h.displayBtn && (f = !0))
                });
                var h = c.resetZoomButton;
                f && !h ? c.showResetZoom() : !f && D(h) && (c.resetZoomButton = h.destroy());
                d && c.redraw(q(c.options.chart.animation, a && a.animation, 100 > c.pointCount))
            },
            pan: function (a, c) {
                var d = this,
                    e = d.hoverPoints,
                    f = d.options.chart,
                    g;
                c = "object" ===
                    typeof c ? c : {
                        enabled: c,
                        type: "x"
                    };
                f && f.panning && (f.panning = c);
                var h = c.type;
                L(this, "pan", {
                    originalEvent: a
                }, function () {
                    e && e.forEach(function (a) {
                        a.setState()
                    });
                    var c = [1];
                    "xy" === h ? c = [1, 0] : "y" === h && (c = [0]);
                    c.forEach(function (c) {
                        var e = d[c ? "xAxis" : "yAxis"][0],
                            f = e.options,
                            b = e.horiz,
                            h = a[b ? "chartX" : "chartY"];
                        b = b ? "mouseDownX" : "mouseDownY";
                        var k = d[b],
                            l = (e.pointRange || 0) / 2,
                            m = e.reversed && !d.inverted || !e.reversed && d.inverted ? -1 : 1,
                            q = e.getExtremes(),
                            t = e.toValue(k - h, !0) + l * m;
                        m = e.toValue(k + e.len - h, !0) - l * m;
                        var p = m < t;
                        k =
                            p ? m : t;
                        t = p ? t : m;
                        m = Math.min(q.dataMin, l ? q.min : e.toValue(e.toPixels(q.min) - e.minPixelPadding));
                        l = Math.max(q.dataMax, l ? q.max : e.toValue(e.toPixels(q.max) + e.minPixelPadding));
                        if (!f.ordinal) {
                            c && (f = m - k, 0 < f && (t += f, k = m), f = t - l, 0 < f && (t = l, k -= f));
                            if (e.series.length && k !== q.min && t !== q.max && c || e.panningState && k >= e.panningState.startMin && t <= e.panningState.startMax) e.setExtremes(k, t, !1, !1, {
                                trigger: "pan"
                            }), g = !0;
                            d[b] = h
                        }
                    });
                    g && d.redraw(!1);
                    E(d.container, {
                        cursor: "move"
                    })
                })
            }
        });
        F(r.prototype, {
            select: function (a, c) {
                var d = this,
                    e = d.series,
                    f = e.chart;
                this.selectedStaging = a = q(a, !d.selected);
                d.firePointEvent(a ? "select" : "unselect", {
                    accumulate: c
                }, function () {
                    d.selected = d.options.selected = a;
                    e.options.data[e.data.indexOf(d)] = d.options;
                    d.setState(a && "select");
                    c || f.getSelectedPoints().forEach(function (a) {
                        var c = a.series;
                        a.selected && a !== d && (a.selected = a.options.selected = !1, c.options.data[c.data.indexOf(a)] = a.options, a.setState(f.hoverPoints && c.options.inactiveOtherPoints ? "inactive" : ""), a.firePointEvent("unselect"))
                    })
                });
                delete this.selectedStaging
            },
            onMouseOver: function (a) {
                var c = this.series.chart,
                    d = c.pointer;
                a = a ? d.normalize(a) : d.getChartCoordinatesFromPoint(this, c.inverted);
                d.runPointActions(a, this)
            },
            onMouseOut: function () {
                var a = this.series.chart;
                this.firePointEvent("mouseOut");
                this.series.options.inactiveOtherPoints || (a.hoverPoints || []).forEach(function (a) {
                    a.setState()
                });
                a.hoverPoints = a.hoverPoint = null
            },
            importEvents: function () {
                if (!this.hasImportedEvents) {
                    var a = this,
                        c = h(a.series.options.point, a.options).events;
                    a.events = c;
                    N(c, function (c, d) {
                        u(c) &&
                            J(a, d, c)
                    });
                    this.hasImportedEvents = !0
                }
            },
            setState: function (a, c) {
                var d = this.series,
                    e = this.state,
                    g = d.options.states[a || "normal"] || {},
                    h = f[d.type].marker && d.options.marker,
                    k = h && !1 === h.enabled,
                    l = h && h.states && h.states[a || "normal"] || {},
                    m = !1 === l.enabled,
                    r = d.stateMarkerGraphic,
                    n = this.marker || {},
                    b = d.chart,
                    u = d.halo,
                    v, y = h && d.markerAttribs;
                a = a || "";
                if (!(a === this.state && !c || this.selected && "select" !== a || !1 === g.enabled || a && (m || k && !1 === l.enabled) || a && n.states && n.states[a] && !1 === n.states[a].enabled)) {
                    this.state = a;
                    y &&
                        (v = d.markerAttribs(this, a));
                    if (this.graphic) {
                        e && this.graphic.removeClass("highcharts-point-" + e);
                        a && this.graphic.addClass("highcharts-point-" + a);
                        if (!b.styledMode) {
                            var A = d.pointAttribs(this, a);
                            var D = q(b.options.chart.animation, g.animation);
                            d.options.inactiveOtherPoints && ((this.dataLabels || []).forEach(function (a) {
                                a && a.animate({
                                    opacity: A.opacity
                                }, D)
                            }), this.connector && this.connector.animate({
                                opacity: A.opacity
                            }, D));
                            this.graphic.animate(A, D)
                        }
                        v && this.graphic.animate(v, q(b.options.chart.animation, l.animation,
                            h.animation));
                        r && r.hide()
                    } else {
                        if (a && l) {
                            e = n.symbol || d.symbol;
                            r && r.currentSymbol !== e && (r = r.destroy());
                            if (v)
                                if (r) r[c ? "animate" : "attr"]({
                                    x: v.x,
                                    y: v.y
                                });
                                else e && (d.stateMarkerGraphic = r = b.renderer.symbol(e, v.x, v.y, v.width, v.height).add(d.markerGroup), r.currentSymbol = e);
                            !b.styledMode && r && r.attr(d.pointAttribs(this, a))
                        }
                        r && (r[a && this.isInside ? "show" : "hide"](), r.element.point = this)
                    }
                    a = g.halo;
                    g = (r = this.graphic || r) && r.visibility || "inherit";
                    a && a.size && r && "hidden" !== g && !this.isCluster ? (u || (d.halo = u = b.renderer.path().add(r.parentGroup)),
                        u.show()[c ? "animate" : "attr"]({
                            d: this.haloPath(a.size)
                        }), u.attr({
                            "class": "highcharts-halo highcharts-color-" + q(this.colorIndex, d.colorIndex) + (this.className ? " " + this.className : ""),
                            visibility: g,
                            zIndex: -1
                        }), u.point = this, b.styledMode || u.attr(F({
                            fill: this.color || d.color,
                            "fill-opacity": a.opacity
                        }, a.attributes))) : u && u.point && u.point.haloPath && u.animate({
                        d: u.point.haloPath(0)
                    }, null, u.hide);
                    L(this, "afterSetState")
                }
            },
            haloPath: function (a) {
                return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX) -
                    a, this.plotY - a, 2 * a, 2 * a)
            }
        });
        F(k.prototype, {
            onMouseOver: function () {
                var a = this.chart,
                    c = a.hoverSeries;
                if (c && c !== this) c.onMouseOut();
                this.options.events.mouseOver && L(this, "mouseOver");
                this.setState("hover");
                a.hoverSeries = this
            },
            onMouseOut: function () {
                var a = this.options,
                    c = this.chart,
                    d = c.tooltip,
                    e = c.hoverPoint;
                c.hoverSeries = null;
                if (e) e.onMouseOut();
                this && a.events.mouseOut && L(this, "mouseOut");
                !d || this.stickyTracking || d.shared && !this.noSharedTooltip || d.hide();
                c.series.forEach(function (a) {
                    a.setState("", !0)
                })
            },
            setState: function (a, c) {
                var d = this,
                    e = d.options,
                    f = d.graph,
                    g = e.inactiveOtherPoints,
                    h = e.states,
                    k = e.lineWidth,
                    l = e.opacity,
                    m = q(h[a || "normal"] && h[a || "normal"].animation, d.chart.options.chart.animation);
                e = 0;
                a = a || "";
                if (d.state !== a && ([d.group, d.markerGroup, d.dataLabelsGroup].forEach(function (c) {
                        c && (d.state && c.removeClass("highcharts-series-" + d.state), a && c.addClass("highcharts-series-" + a))
                    }), d.state = a, !d.chart.styledMode)) {
                    if (h[a] && !1 === h[a].enabled) return;
                    a && (k = h[a].lineWidth || k + (h[a].lineWidthPlus || 0), l = q(h[a].opacity,
                        l));
                    if (f && !f.dashstyle)
                        for (h = {
                                "stroke-width": k
                            }, f.animate(h, m); d["zone-graph-" + e];) d["zone-graph-" + e].attr(h), e += 1;
                    g || [d.group, d.markerGroup, d.dataLabelsGroup, d.labelBySeries].forEach(function (a) {
                        a && a.animate({
                            opacity: l
                        }, m)
                    })
                }
                c && g && d.points && d.setAllPointsToState(a)
            },
            setAllPointsToState: function (a) {
                this.points.forEach(function (c) {
                    c.setState && c.setState(a)
                })
            },
            setVisible: function (a, c) {
                var d = this,
                    e = d.chart,
                    f = d.legendItem,
                    g = e.options.chart.ignoreHiddenSeries,
                    h = d.visible;
                var k = (d.visible = a = d.options.visible =
                    d.userOptions.visible = "undefined" === typeof a ? !h : a) ? "show" : "hide";
                ["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"].forEach(function (a) {
                    if (d[a]) d[a][k]()
                });
                if (e.hoverSeries === d || (e.hoverPoint && e.hoverPoint.series) === d) d.onMouseOut();
                f && e.legend.colorizeItem(d, a);
                d.isDirty = !0;
                d.options.stacking && e.series.forEach(function (a) {
                    a.options.stacking && a.visible && (a.isDirty = !0)
                });
                d.linkedSeries.forEach(function (c) {
                    c.setVisible(a, !1)
                });
                g && (e.isDirtyBox = !0);
                L(d, k);
                !1 !== c && e.redraw()
            },
            show: function () {
                this.setVisible(!0)
            },
            hide: function () {
                this.setVisible(!1)
            },
            select: function (a) {
                this.selected = a = this.options.selected = "undefined" === typeof a ? !this.selected : a;
                this.checkbox && (this.checkbox.checked = a);
                L(this, a ? "select" : "unselect")
            },
            drawTracker: d.drawTrackerGraph
        })
    });
    S(r, "parts/Responsive.js", [r["parts/Globals.js"], r["parts/Utilities.js"]], function (d, g) {
        var r = g.find,
            v = g.isArray,
            J = g.isObject,
            M = g.merge,
            E = g.objectEach,
            A = g.pick,
            F = g.splat,
            L = g.uniqueKey;
        d = d.Chart;
        d.prototype.setResponsive = function (d, g) {
            var u = this.options.responsive,
                h = [],
                v = this.currentResponsive;
            !g && u && u.rules && u.rules.forEach(function (d) {
                "undefined" === typeof d._id && (d._id = L());
                this.matchResponsiveRule(d, h)
            }, this);
            g = M.apply(0, h.map(function (d) {
                return r(u.rules, function (g) {
                    return g._id === d
                }).chartOptions
            }));
            g.isResponsiveOptions = !0;
            h = h.toString() || void 0;
            h !== (v && v.ruleIds) && (v && this.update(v.undoOptions, d, !0), h ? (v = this.currentOptions(g), v.isResponsiveOptions = !0, this.currentResponsive = {
                    ruleIds: h,
                    mergedOptions: g,
                    undoOptions: v
                }, this.update(g, d, !0)) : this.currentResponsive =
                void 0)
        };
        d.prototype.matchResponsiveRule = function (d, g) {
            var r = d.condition;
            (r.callback || function () {
                return this.chartWidth <= A(r.maxWidth, Number.MAX_VALUE) && this.chartHeight <= A(r.maxHeight, Number.MAX_VALUE) && this.chartWidth >= A(r.minWidth, 0) && this.chartHeight >= A(r.minHeight, 0)
            }).call(this) && g.push(d._id)
        };
        d.prototype.currentOptions = function (d) {
            function g(d, h, u, f) {
                var c;
                E(d, function (d, m) {
                    if (!f && -1 < r.collectionsWithUpdate.indexOf(m))
                        for (d = F(d), u[m] = [], c = 0; c < d.length; c++) h[m][c] && (u[m][c] = {}, g(d[c], h[m][c],
                            u[m][c], f + 1));
                    else J(d) ? (u[m] = v(d) ? [] : {}, g(d, h[m] || {}, u[m], f + 1)) : u[m] = "undefined" === typeof h[m] ? null : h[m]
                })
            }
            var r = this,
                h = {};
            g(d, this.options, h, 0);
            return h
        }
    });
    S(r, "masters/highcharts.src.js", [r["parts/Globals.js"]], function (d) {
        return d
    });
    r["masters/highcharts.src.js"]._modules = r;
    return r["masters/highcharts.src.js"]
});
//# sourceMappingURL=highcharts.js.map