let contentBox = document.getElementById('content')
let blogForm = document.getElementById('blogForm')
let blogArray = []


function renderBlogs(array){
        contentBox.innerHTML = ''
        count = 1
        for (i=0;i<array.length;i++){
                let id = document.createElement('h3')
                id.textContent = count
                let title = document.createElement('h2')
                title.textContent = array[i].title
                let body = document.createElement('p')
                body.textContent = array[i].body
                let bodyParagraph = document.createElement('div')  

                bodyParagraph.appendChild(id)
                bodyParagraph.appendChild(title)
                bodyParagraph.appendChild(body)
                contentBox.appendChild(bodyParagraph)

                count++
        }
}

function getPosts(link, number = 5){
        fetch(link)
        .then(response => response.json())
        .then(data => {
                blogArray = [...data.splice(0, number)]

                renderBlogs(blogArray)
        })
}

getPosts("https://apis.scrimba.com/jsonplaceholder/posts", 5)
renderBlogs(blogArray)


blogForm.addEventListener('submit', function(e){
        e.preventDefault();
        postTitle = document.getElementById('blog-title').value;
        postBody = document.getElementById('blog-body').value;

        if (
                (postTitle !== '') && 
                (postBody !== '')
            )
        {

                const options = {
                        method: 'POST',
                        body: JSON.stringify({
                                title: postTitle,
                                body: postBody
                        }),
                        headers: {
                                'Content-Type': 'application/json'
                        }
                }

                fetch('https://apis.scrimba.com/jsonplaceholder/posts', options)
                        .then(res => res.json())
                        .then(data => {
                                blogArray.unshift(data)
                                console.log(blogArray);
                                renderBlogs(blogArray)
                        })                

                // postTitle = ''
                // postBody = ''
                blogForm.reset()
                blog = document.getElementById('blog')
                blog.classList.remove('active')
        }        
})


document.getElementById('newBlog').addEventListener('click', function(){
        blog = document.getElementById('blog')
        blog.classList.add('active')
})



document.getElementById('close').addEventListener('click', function(){
        blog = document.getElementById('blog')
        blog.classList.remove('active')
})





                


;


