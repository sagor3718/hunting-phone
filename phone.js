const loadPhone = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phones = data.data
    displayPhones(phones)
}
const displayPhones = phones => {

    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    // display show all button if there are more then 12
    const showAll = document.getElementById('show-all-container')
    if (phones.length > 12) {
        showAll.classList.remove('hidden');
    }
    else {
        showAll.classList.add('hidden');
    }

    phones = phones.slice(0, 12);
    phones.forEach(phone => {
        console.log(phone);

        const phoneCard = document.createElement('div');
        phoneCard.classList = `card w-96 bg-green-100 shadow-xl`;

        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="phone" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>${phone.brand}</p>
            <div class="card-actions justify-center">
            <button onclick= "showDetails('${phone.slug}');my_modal_5.showModal()" class="btn btn-accent">Show Details</button>
            </div>
        </div>
        `;
        phoneContainer.appendChild(phoneCard);
    })
    toggleloadingspinner(false);

}
// search
const searchHandle = () => {
    toggleloadingspinner(true);
    const searchFeild = document.getElementById('search-feild');
    const searchText = searchFeild.value;
    console.log(searchText);
    loadPhone(searchText);
}
//    toggleloadingspinner
const toggleloadingspinner = (isLoading) => {
    const loadingspinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingspinner.classList.remove('hidden');
    }
    else {
        loadingspinner.classList.add('hidden');
    }
}
//    show details
const showDetails = async id => {
    console.log('show details worked', id)
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json();
    console.log(data);

}
loadPhone('iPhone');