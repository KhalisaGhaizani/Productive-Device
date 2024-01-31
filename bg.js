let okay_websites = []
let turnOn = 'http://192.168.1.14/on'
let turnOff = 'http://192.168.1.14/off'


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
