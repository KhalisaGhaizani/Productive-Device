let okay_websites = []
let turnOn = 'http://esp8266_ip/on' //change it to the device's ip
let turnOff = 'http://esp8266_ip/off'


chrome.tabs.onActivated.addListener((activeInfo) =>
{
    chrome.storage.local.get("web", (result) => 
    {
        if (result.web === undefined)
        {
            console.log("Not found")
        }
        else
        {
            okay_websites = result.web

            let tabId = activeInfo.tabId
    
            chrome.tabs.get(tabId, (tab) => 
            {
                let include = 0;
                
                for (let i = 0; i < okay_websites.length; i++)
                {
                    if (tab.url.includes(okay_websites[i]))
                    {
                        include++
                    }
                }
                if ( include === 0 )
                {     
                    fetch(turnOn)
                    console.log("bad");
                }
                else
                {
                    fetch(turnOff)
                    console.log("good")
                }
            })
        }
    })
})


chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => 
{
    
    if(changeInfo.url)
    {
        let include = 0;
        console.log("url: ", changeInfo.url)
        for (let i = 0; i < okay_websites.length; i++)
        {
            if (changeInfo.url.includes(okay_websites[i]))
            {
                include++
            }
        }
        if (include === 0)
        {
            fetch(turnOn)
            console.log("bad")
        }
        else{
            fetch(turnOff)
            console.log("good")
        }
    }

})
