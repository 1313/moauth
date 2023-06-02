#


```css
*::own {
   allow(read, update, create, delete)
}
journal {
    
}
Admin {
    *::own {
        allow(read, update, create, delete)
    }

    journal::own test {
        extend(crud)
        allow(read, update, create, test)
    }

    journal[a="123"]::own test {
        extend(crud)
        allow(read, update, create, test)
        deny(read, update)
    }
}
Nurse {
    .journal::own .test {
        deny(update)
    }
}
```

```
Operations matrix
Object = journalX
Subject = Me

Specificity wins!

findMatchingAncestor()

compileAuthMap() {
    ids only output
    "type:id"
}

{"test": {
    .with-anceestor: ["Journal:2323"],
    .with-attribute: ["a=234"]
    read, update create test
}}

<Can I={me} Subject={testInstance} action={read}>

</Can>

testInstance {
    ancestors: ["lala:1234","journal:2133"]
}

ME combine roles

```


```
ROLE
BRAKET
ATTRIBUTE-OPEN-BRACKET
ATTRIBUTE-OPEN-BRACKET
IDENTIFIER
LITERAL
CLASS-LITERAL
CLASS-MODIFIER
EXTEND-MODIFIER
EXTEND-BRACKET
EXTEND-REFERENCE
```