# client align

### TODO
- [ ] single select component
    * server side page sort
- [ ] less learn change package css
- [ ] popup confirm, success, error


### about data request
* all select data use 
``` javascript
[{
    key : XXX
    value : XXX
}]
```
* data request structure
``` javascript
{
    success : ture/false
    data : {
        rows : [] (if has data rows)
        total : number (total number for the server side)
    }
    reason : 'error reason or something else'
}
```
* request data error code
```
    600 : http request promise error
    601 : server side success false
```