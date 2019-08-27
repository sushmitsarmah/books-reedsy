1. create symbolic link to dist. `ln -s q4-angular/dist/q4 firebase/public`
2. build distribution. `cd q4-angular && npm run build`
3. deploy code to firebase. `cd firebase && firebase deploy`
4. add data to firestore db. visit /addBooks 
