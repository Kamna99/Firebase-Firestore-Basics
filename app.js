const cafelist=document.querySelector('#cafe-list');
const form=document.querySelector('#add-cafe-form');

//create elements and render cafe
function renderCafe(doc){
    let li = document.createElement('li');
    let name= document.createElement('span');
    let city = document.createElement('span');
    //delete data
    let cross = document.createElement('div');
    
    li.setAttribute('data-id',doc.id);
    name.textContent=doc.data().Name;
    city.textContent=doc.data().City;
    cross.textContent='x';
    
    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross);
    
    cafelist.appendChild(li);
    
    //deleting data
    cross.addEventListener('click',(e)=>{
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id'); // get id from parent of x (which is li);
        db.collection('cafes').doc(id).delete();
    })
}

//getting data
//takes sometime to process, asynch request, when request is processed then() will get executed
/*db.collection('cafes').get().then((snapshot)=>{
    //console.log(snapshot.docs);
    snapshot.docs.forEach(doc=>{
        console.log(doc.data())
    })
    snapshot.docs.forEach(doc => {
        renderCafe(doc);
}) 
})*/

//submit data
form.addEventListener('submit',(e)=>{
    //prevent default action of reloading once submitted
    e.preventDefault();
    db.collection('cafes').add({
        Name : form.name.value,
        City : form.city.value
    });
    form.name.value='Add Name';
    form.city.value='Add City ';
})

//real time listener
db.collection('cafes').onSnapshot(snapshot=>{
    let changes= snapshot.docChanges();
    //console.log(changes);
    changes.forEach(change=>{
        
    if(change.type == 'added' ){
        renderCafe(change.doc);
        
    }else if (change.type == 'removed'){
        let li = cafelist.querySelector('[data-id ='+ change.doc.id + ']');
        cafelist.removeChild(li);
    }
})
})


//retrieve specific documents
/*db.collection('cafes').where('City','==','Mumbai').get().then((snapshot)=>{
        snapshot.docs.forEach(doc => {
        renderCafe(doc);
}) 
})*/


//order by
/*db.collection('cafes').orderBy('Name').get().then((snapshot)=>{
        snapshot.docs.forEach(doc => {
        renderCafe(doc);
}) 
})*/

//where and order by
/*db.collection('cafes').where('City','==','Mumbai').orderBy('Name').get().then((snapshot)=>{
        snapshot.docs.forEach(doc => {
        renderCafe(doc);
}) 
})*/

//update data
/*
db.collection('cafes').doc(id).update({
Name : 'Changed name'
}) update
db.collection('cafes').doc(id).set({
Name : 'Changed name'
}) set will overwrite
*/




