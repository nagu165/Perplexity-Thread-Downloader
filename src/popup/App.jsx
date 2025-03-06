import { useEffect, useState } from "react"
import axios from "axios";
import React from "react";

const App: React.FC = () => {
    //states
    const [isPerplexity, setPerplexity] = useState(false);
    const [DownloadHistory, setDownloadHistory] = useState<any[]>([]);
    const [isLoading,setLoading] = useState(false);
    //initializing resources
    useEffect(() => {
        chrome.tabs.query({active:true}, (tabs) => { //find out currently active tabs
            const url = tabs[0].url || '';
            setPerplexity(url.includes('perplexity.ai'))
        })
        fetchDownloadHistory();
    },[])

    const fetchDownloadHistory = async() => {
        try{
            const response = await axios.get('http://localhost:3000/api/downloads/history', {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.data;
            setDownloadHistory(data);
        } catch(error) {
            console.error('Failed to fetch data:',error);
        }
    }

    const handleDownload = async() => {
        setLoading(true);
        chrome.tabs.query({ active:true },(tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {action: 'downloadThread'}, () => {
                setTimeout(() => {
                    setLoading(false);
                    fetchDownloadHistory();
                },2000)
            })
        })
    }

    return (
        <div className="Container">
            <h1>AI Chat Downloader</h1>
            {isPerplexity ? (
                <button
                onClick={handleDownload}
                disabled={isLoading}
            >
                {isLoading ? "Loading" : "Download Now"}
            </button>
            ): (<div>Please open perplexity</div>)}
        </div>
    )
}

export default App;