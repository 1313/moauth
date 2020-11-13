<!-- ## Requiorements -->



```
ReadOnlyOwn -> Ownership & Permissions.read
ReadOthers -> Ownership & Permissions(Document).read

CanRead: Ownership
CanWrite: Ownership
```

```
[Entry1] -> [Entry2] -> [Entry3]
```

```
Permissions per user flat
CanEdit
CanOpenX
```



```jsx
<Can rule={Read} subject={Document}></Can>
```