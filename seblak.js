
let text_input = document.getElementById("okay-website")
let button = document.getElementById("ok-button")
let okay_website_list = document.getElementById("okay-website-list")
let clear_button = document.getElementById("clear-button")
let okay_websites = []
let amount_of_website = 0

chrome.storage.local.get("web", (result) => 
{
    if (result.web === undefined)
    {
        console.log("Not found")
    }
    else
    {
        okay_websites = result.web
        amount_of_website = result.web.length
        console.log("retrieved", okay_websites)
        display_html()
    }

})

function display_html()
{
    let html = ""
    for (let i = 0; i < okay_websites.length; i++)
    {
        html += `<li>${okay_websites[i]}</li>`
    }
    okay_website_list.innerHTML = html;
    
}

clear_button.addEventListener("click", () => 
{
    chrome.storage.local.clear(() => 
    {
        okay_websites = []
        amount_of_website = 0
        display_html()
    })
})

button.addEventListener("click", () => 
{
    let input_value = text_input.value
    if(input_value.trim() !== "")
    {
        okay_websites[amount_of_website] = input_value
        chrome.storage.local.set({ web: okay_websites}, () => 
        {
            text_input.value = ""
            amount_of_website++;
            display_html()
        })
    }
})


