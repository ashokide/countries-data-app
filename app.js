// https://restcountries.eu/rest/v2/all

const fetchData = async (link) => {
    let result = await fetch(link)
    let data = await result.json()
    return data
}
let countriesData = []
let final = []
let content = document.querySelector('#content')
content.innerHTML = 'Loading Data ...'
fetchData("https://restcountries.eu/rest/v2/all")
    .then((data) => {
        data.forEach((country) => {
            countriesData.push(country)
        })
        setTimeout(() => {
            content.innerHTML = ''
            final = countriesData
            final.map((e) => {
                content.innerHTML += `
                    <div class="card mx-2 my-2 " style="width: 18rem;">
                    <h5 class="card-header text-center">${e.alpha2Code}</h5>
                    <img src="${e.flag}" class="card-img-top">
                    <div class="card-body">
                        <p class="card-text">Name: ${e.name}</p>
                        <p class="card-text">Capital: ${e.capital}</p>
                        <p class="card-text">Region: ${e.region}</p>
                        <p class="card-text">Sub Region: ${e.subregion}</p>
                        <p class="card-text">Population: ${e.population}</p>
                        <p class="card-text">Timezone: ${e.timezones}</p>
                        <p class="card-text">Curreny Name: ${e.currencies[0].name}</p>
                    </div>
                </div>`
            })
        }, 2000)
    })
    .catch(() => console.log("something wrong"))


document.querySelector('#search').addEventListener('input', (e) => {
    final = countriesData.filter((data) => data.name.toLowerCase().startsWith(e.target.value.toLowerCase()))
    content.innerHTML = ''
    if (final.length === 0) {
        content.innerHTML = 'No Data'
    }
    final.slice(0, 25).map((e) => {
        content.innerHTML += `
        <div class="card mx-2 my-2 " style="width: 18rem;">
                    <h5 class="card-header text-center">${e.alpha2Code}</h5>
                    <img src="${e.flag}" class="card-img-top">
                    <div class="card-body">
                        <p class="card-text">Name: ${e.name}</p>
                        <p class="card-text">Capital: ${e.capital}</p>
                        <p class="card-text">Region: ${e.region}</p>
                        <p class="card-text">Sub Region: ${e.subregion}</p>
                        <p class="card-text">Population: ${e.population}</p>
                        <p class="card-text">Timezone: ${e.timezones}</p>
                        <p class="card-text">Curreny Name: ${e.currencies[0].name}</p>
                    </div>
                </div>`
    })
})