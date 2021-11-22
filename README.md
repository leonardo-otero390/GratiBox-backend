# Api documentation
<details>
    <summary>
        <strong style="color:green;">POST</strong> /sign-up
    </summary>
send body request like this:

```json
    {
        "name":"joe",
        "email":"j@j.com",
        "password":"***"
    }
```
* it returns status <strong style="color:green;">201</strong> for success

* it returns status <strong style="color:purple;">409</strong> for email in use</li>

* it returns status <strong style="color:purple;">400</strong> for any other issue</li>

</details>

<details>
    <summary>
        <strong style="color:green;">POST</strong> /sign-in
    </summary>
send body request like this

```json
    {
        "email":"j@j.com",
        "password":"***"
    }
```
* it returns status <strong style="color:green;">201</strong> for success with an object array like this:
```json
{
  "token": "facf6e92-d828-4491-89d7-56796738be37",
  "user": {
    "id": 1,
    "name": "joe",
    "email": "j@j.com"
  }
}
```
* it returns status <strong style="color:purple;">401</strong> for wrong password/email</li>

* it returns status <strong style="color:purple;">400</strong> for any other error</li>
    
</details>

<details>
    <summary>
        <strong style="color:green;">POST</strong> /subscription
    </summary>
send body request like this:

```json
     {
        "userId":1,
        "planId":1,
        "name":"joe smith bros",
        "shipDateId":1,
        "productsId":[1,2],
        "ZIPCode":"1234567",
        "address":"your address",
        "state":"YS",
        "city":"your city"
    }
```
and the token in headers, to authorization like this:
```json
headers: {
			"Authorization": "Bearer b017157b-faef-442b-95cb-8f4c12a2d9e0",
		}
```
* it returns status <strong style="color:green;">201</strong> for success
* it returns status <strong style="color:purple;">400</strong> for missing, invalid token or bad request
* it returns status <strong style="color:purple;">404</strong> for no session token
* it returns status <strong style="color:purple;">422</strong> for empty token

</details>
