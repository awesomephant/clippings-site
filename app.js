const clippingBtn = document.querySelector('#js-clippingButton')

clippingBtn.addEventListener('click', function(e){
    console.log('hi')
    socket.emit('clippingRequest', null, (data) => {})
})