# jQuery isInViewport v1.0.0
##### a lightweight jQuery plugin to detect element is in viewport

### Usage:
```javascript
$('.selector').isInViewport(function(response, element){
    // response = true or false
});
```

### Using bower?
```
bower install is-in-viewport --save-dev
```

### Options:
```javascript
inset:      1,
timeout:    250
```

##### inset
###### default: 1
1 means if 0% of element is in viewport
0.5 means if 50% of element is in viewport

```javascript
$('.section-two').isInViewport({ inset : 0.5 }, function(response){

});
```

##### timeout
###### default: 250
scroll timeout, you can set it to 0 if you need instant update when element is in viewport

```javascript
$('.section-two').isInViewport({ inset : 0.5, timeout : 0 }, function(response){

});
```