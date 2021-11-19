# Api documentation
<details>
    <summary>
        <strong style="color:green;">POST</strong> /sign-up
    </summary>
send body request like this

```json
 [ 
    {
        "name":"joe",
        "email":"j@j.com",
        "password":"***"
    }
 ]
```
* it returns status <strong style="color:green;">201</strong> for success

* it returns status <strong style="color:red;">409</strong> for email in use</li>

* it returns status <strong style="color:red;">400</strong> for any other issue</li>

</details>

<details>
    <summary>
        <strong style="color:green;">POST</strong> /sign-in
    </summary>
send body request like this

```json
 [ 
    {
        "email":"j@j.com",
        "password":"***"
    }
 ]
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
* it returns status <strong style="color:red;">401</strong> for wrong password/email</li>

* it returns status <strong style="color:red;">400</strong> for any other error</li>
    
</details>
