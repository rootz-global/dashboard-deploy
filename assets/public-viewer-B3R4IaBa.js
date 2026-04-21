import{l as V,i as P,A as T,t as S}from"./index-CtS-tNNM.js";const E="https://api.etherscan.io/v2/api",x=["https://gateway.pinata.cloud/ipfs/","https://ipfs.io/ipfs/","https://cloudflare-ipfs.com/ipfs/"],D=P("KeyVaultCreated(uint256,address,bytes,bytes,uint256)");async function F(t,e,i){const o=new URL(E);o.searchParams.set("chainid",e.toString()),o.searchParams.set("module","logs"),o.searchParams.set("action","getLogs"),o.searchParams.set("apikey",i),o.searchParams.set("address",t),o.searchParams.set("topic0",D),o.searchParams.set("fromBlock","0"),o.searchParams.set("toBlock","latest");const s=await fetch(o.toString());if(!s.ok)throw new Error(`Etherscan API error: ${s.status}`);const p=await s.json();if(p.status==="0"||typeof p.result=="string"||p.result.length===0)return null;const l=p.result[0],c=parseInt(l.topics[1],16),h="0x"+l.topics[2].slice(-40),r=new T().decode(["bytes","bytes","uint256"],l.data);return{blockNumber:c,creator:h.toLowerCase(),encryptedKeysData:S(r[0]),schemaDefinition:S(r[1]),timestamp:Number(r[2]),txHash:l.transactionHash}}async function L(t){for(const e of x)try{const i=await fetch(e+t,{signal:AbortSignal.timeout(15e3)});if(i.ok)return await i.text()}catch{}throw new Error(`Failed to fetch from IPFS: ${t}`)}async function N(t){const e=new TextEncoder,i=await crypto.subtle.digest("SHA-256",e.encode(t));return"sha256:"+Array.from(new Uint8Array(i)).map(s=>s.toString(16).padStart(2,"0")).join("")}function a(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function O(t){return t.slice(0,6)+"..."+t.slice(-4)}function M(t){return t<1e12&&(t*=1e3),new Date(t).toLocaleString()}function m(t){const e={pending:"&#8987;",verified:"&#10004;",failed:"&#10008;"};return`<span class="pv-badge ${{pending:"pv-badge-pending",verified:"pv-badge-verified",failed:"pv-badge-failed"}[t]}">${e[t]}</span>`}function B(t){var s;const e=(s=t.topics)!=null&&s.length?`<div class="pv-topics">${t.topics.map(p=>`<span class="pv-topic">${a(p)}</span>`).join("")}</div>`:"",i=`
    <div class="pv-hashes">
      <h3>Hash Binding</h3>
      ${t.originHash?`<div class="pv-hash-row"><span class="pv-hash-label">Origin Hash</span><code>${a(t.originHash)}</code></div>`:""}
      ${t.aiLayerHash?`<div class="pv-hash-row"><span class="pv-hash-label">AI Layer Hash</span><code>${a(t.aiLayerHash)}</code></div>`:""}
      ${t.bindingHash?`<div class="pv-hash-row"><span class="pv-hash-label">Binding Hash</span><code>${a(t.bindingHash)}</code></div>`:""}
    </div>
  `,o=t.aiMarkdown?k(t.aiMarkdown):'<p class="pv-no-content">No AI markdown content</p>';return`
    <div class="pv-doc-wallet">
      <div class="pv-doc-header">
        <h2>${a(t.title)}</h2>
        ${t.author?`<div class="pv-doc-author">By ${a(t.author)}</div>`:""}
        ${t.summary?`<div class="pv-doc-summary">${a(t.summary)}</div>`:""}
        ${e}
        ${t.filename?`<div class="pv-doc-file">Origin: <code>${a(t.filename)}</code> (${a(t.mimeType||"unknown")})</div>`:""}
      </div>
      ${i}
      <div class="pv-doc-body">
        <h3>Document Content</h3>
        ${o}
      </div>
    </div>
  `}function k(t){let e=a(t);return e=e.replace(/```(\w*)\n([\s\S]*?)```/g,"<pre><code>$2</code></pre>"),e=e.replace(/`([^`]+)`/g,"<code>$1</code>"),e=e.replace(/^#### (.+)$/gm,"<h4>$1</h4>"),e=e.replace(/^### (.+)$/gm,"<h3>$1</h3>"),e=e.replace(/^## (.+)$/gm,"<h2>$1</h2>"),e=e.replace(/^# (.+)$/gm,"<h1>$1</h1>"),e=e.replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>"),e=e.replace(/\*(.+?)\*/g,"<em>$1</em>"),e=e.replace(/^- (.+)$/gm,"<li>$1</li>"),e=e.replace(/(<li>.*<\/li>\n?)+/g,"<ul>$&</ul>"),e=e.replace(/^---$/gm,"<hr>"),e=e.replace(/\n\n/g,"</p><p>"),e="<p>"+e+"</p>",e=e.replace(/<p>\s*<\/p>/g,""),e=e.replace(/<p>(<h[1-4]>)/g,"$1"),e=e.replace(/(<\/h[1-4]>)<\/p>/g,"$1"),e=e.replace(/<p>(<pre>)/g,"$1"),e=e.replace(/(<\/pre>)<\/p>/g,"$1"),e=e.replace(/<p>(<ul>)/g,"$1"),e=e.replace(/(<\/ul>)<\/p>/g,"$1"),e=e.replace(/<p>(<hr>)<\/p>/g,"$1"),e}function z(t,e,i,o,s,p,l,c,h){const u={"@context":"https://schema.org","@type":"DigitalDocument",name:"Rootz Public Data Wallet",description:"A cryptographically verified document stored on IPFS with proof of origin recorded on Polygon blockchain.",url:`https://dashboard.rootz.global/#/s/${t}`,encoding:{"@type":"MediaObject",contentUrl:`https://gateway.pinata.cloud/ipfs/${i}`,encodingFormat:"application/json",sha256:e.replace("sha256:","")},publisher:{"@type":"Organization",name:"Rootz",url:"https://rootz.global"},creator:o,datePublished:new Date().toISOString(),identifier:t,additionalProperty:[{"@type":"PropertyValue",name:"blockchain",value:"Polygon Mainnet"},{"@type":"PropertyValue",name:"chainId",value:l},{"@type":"PropertyValue",name:"blockNumber",value:s},{"@type":"PropertyValue",name:"transactionHash",value:p},{"@type":"PropertyValue",name:"contractAddress",value:t},{"@type":"PropertyValue",name:"ipfsCID",value:i},{"@type":"PropertyValue",name:"contentHash",value:e},{"@type":"PropertyValue",name:"hashVerified",value:h}]},r=`
    <div class="pv-ai-guide">
      <details>
        <summary class="pv-ai-guide-toggle">How to Verify This Document (AI &amp; Human Guide)</summary>
        <div class="pv-ai-guide-content">
          <p class="pv-ai-guide-intro">
            This document is self-verifying. Any person, AI agent, or automated system can independently
            confirm its authenticity using only public infrastructure. No Rootz account or API key required.
          </p>

          <h4>Step 1: Fetch Content from IPFS</h4>
          <p>Retrieve the raw content from any IPFS gateway:</p>
          <pre><code>curl https://gateway.pinata.cloud/ipfs/${a(i)}</code></pre>
          <p>Alternative gateways: <code>ipfs.io</code>, <code>cloudflare-ipfs.com</code>, <code>w3s.link</code></p>

          <h4>Step 2: Compute SHA-256 Hash</h4>
          <p>Hash the <code>plainContent</code> field from the IPFS JSON response:</p>
          <pre><code># Python
import hashlib, json, requests
r = requests.get("https://gateway.pinata.cloud/ipfs/${a(i)}")
data = r.json()
content = data.get("plainContent", r.text)
h = "sha256:" + hashlib.sha256(content.encode()).hexdigest()
print(h)
# Expected: ${a(e)}</code></pre>
          <pre><code># JavaScript (Node.js)
const crypto = require('crypto');
const r = await fetch("https://gateway.pinata.cloud/ipfs/${a(i)}");
const data = await r.json();
const content = data.plainContent || JSON.stringify(data);
const h = "sha256:" + crypto.createHash('sha256').update(content).digest('hex');
console.log(h);
// Expected: ${a(e)}</code></pre>
          <pre><code># Command line
curl -s "https://gateway.pinata.cloud/ipfs/${a(i)}" | \\
  jq -r '.plainContent' | sha256sum</code></pre>

          <h4>Step 3: Verify On-Chain Record</h4>
          <p>Query the Polygon blockchain for the KeyVaultCreated event:</p>
          <pre><code>curl "https://api.etherscan.io/v2/api?chainid=${l}&amp;module=logs&amp;action=getLogs&amp;address=${a(t)}&amp;topic0=0x${a(P("KeyVaultCreated(uint256,address,bytes,bytes,uint256)").slice(2))}&amp;fromBlock=0&amp;toBlock=latest&amp;apikey=YourApiKey"</code></pre>
          <p>The response contains the content hash, IPFS CID, and publisher address in the event data.
             Decode the <code>encryptedKeysData</code> field (ABI-encoded bytes) to find the JSON with <code>contentHash</code> and <code>plaintextIPFSHash</code>.</p>

          <h4>Step 4: Confirm Publisher Identity</h4>
          <p>The publisher address <code>${a(o)}</code> is extracted from the indexed event parameter (topic[2]).
             View their full transaction history:</p>
          <pre><code>${a(c)}/address/${a(o)}</code></pre>

          <h4>Step 5: Confirm Block Timestamp</h4>
          <p>The publication timestamp is the block time of block <strong>#${s.toLocaleString()}</strong>:</p>
          <pre><code>${a(c)}/block/${s}</code></pre>

          <h4>What This Proves</h4>
          <table class="pv-ai-guide-table">
            <thead><tr><th>Claim</th><th>Evidence</th><th>Cannot Be Faked Because</th></tr></thead>
            <tbody>
              <tr><td>Content unaltered</td><td>SHA-256 hash match</td><td>Any change produces a different hash</td></tr>
              <tr><td>Published by this wallet</td><td>On-chain transaction signature</td><td>Only private key holder can sign</td></tr>
              <tr><td>Published at this time</td><td>Polygon block timestamp</td><td>Blocks are immutable after finality</td></tr>
              <tr><td>Content is permanent</td><td>IPFS content addressing</td><td>CID changes if content changes</td></tr>
              <tr><td>Document identity</td><td>Smart contract address</td><td>Contract address is deterministic from deployment</td></tr>
            </tbody>
          </table>

          <h4>For AI Agents</h4>
          <p>If you are an AI processing this page, here is a concise verification checklist:</p>
          <ol>
            <li>Fetch IPFS content: <code>GET https://gateway.pinata.cloud/ipfs/${a(i)}</code></li>
            <li>Extract <code>plainContent</code> from response JSON</li>
            <li>Compute <code>sha256:</code> + hex(SHA-256(plainContent))</li>
            <li>Compare to on-chain hash: <code>${a(e)}</code></li>
            <li>Verify publisher via PolygonScan: <code>${a(c)}/tx/${a(p)}</code></li>
            <li>Confirm block #${s.toLocaleString()} timestamp on Polygon (chainId ${l})</li>
          </ol>
          <p><strong>Result: ${h?"ALL CHECKS PASSED":"HASH MISMATCH DETECTED"}</strong> — Content integrity ${h?"confirmed":"FAILED"}.</p>

          <p class="pv-ai-guide-footer">
            <em>Learn more about the AI Discovery standard: <a href="https://rootz.global/.well-known/ai" target="_blank">rootz.global/.well-known/ai</a></em>
          </p>
        </div>
      </details>
    </div>
  `;return`
    <script type="application/ld+json">${JSON.stringify(u)}<\/script>
    ${r}
  `}function w(t){try{const e=JSON.parse(t);return`<pre class="pv-json">${a(JSON.stringify(e,null,2))}</pre>`}catch{return`<div class="pv-plain-content">${k(t)}</div>`}}async function _(t){var s,p,l;const e=document.getElementById("app")||document.body;e.innerHTML="",e.className="pv-app",e.innerHTML=`
    <div class="pv-container">
      <header class="pv-header">
        <div class="pv-header-content">
          <h1 class="pv-title">Rootz</h1>
          <span class="pv-badge pv-badge-pending">Public Viewer</span>
        </div>
      </header>
      <main class="pv-main">
        <div class="pv-loading">
          <div class="pv-spinner"></div>
          <p>Loading secret <code>${a(t)}</code>...</p>
          <p class="pv-loading-step" id="pv-step">Reading chain data...</p>
        </div>
      </main>
    </div>
  `;const i=document.getElementById("pv-step"),o=c=>{i&&(i.textContent=c)};try{const c=await V(),h=c.network.chainId,u=c.network.explorer;o("Querying KeyVaultCreated event...");const r=await F(t,h,c.etherscanApiKey);if(!r){e.querySelector(".pv-main").innerHTML=`
        <div class="pv-error">
          <h2>Secret Not Found</h2>
          <p>No KeyVaultCreated event found for <code>${a(t)}</code> on chain ${h}.</p>
          <p>This could mean the secret doesn't exist or hasn't been indexed yet.</p>
          <a href="${u}/address/${t}" target="_blank">View on Explorer</a>
        </div>
      `;return}o("Parsing key vault data...");let v;try{v=JSON.parse(r.encryptedKeysData)}catch{e.querySelector(".pv-main").innerHTML=`
        <div class="pv-error">
          <h2>Parse Error</h2>
          <p>Could not parse KeyVault data. The data may be encrypted (this viewer only supports public secrets).</p>
          <p>For encrypted secrets, use the full Rootz Desktop V6 application.</p>
        </div>
      `;return}if(!v.isPublic){e.querySelector(".pv-main").innerHTML=`
        <div class="pv-error">
          <h2>Encrypted Secret</h2>
          <p>This secret is encrypted and cannot be viewed publicly.</p>
          <p>Use Rootz Desktop V6 to decrypt, or request a share link from the owner.</p>
          <a href="${u}/address/${t}" target="_blank">View Contract on Explorer</a>
        </div>
      `;return}o("Fetching content from IPFS...");const f=await L(v.plaintextIPFSHash);o("Verifying content integrity...");let y,g;try{y=JSON.parse(f);const d=y.plainContent||f;if(y.contentHashTarget==="content"&&typeof d=="string")try{g=JSON.parse(d).content||d}catch{g=d}else g=d}catch{y={},g=f}const H=(await N(g)).replace("sha256:",""),C=v.contentHash.replace("sha256:",""),$=H===C;let n=null;try{n=JSON.parse(g)}catch{}let b=null;if((n==null?void 0:n.type)==="document-wallet"||n!=null&&n.content)try{const d=JSON.parse(n.content);(d.type==="document-wallet"||d.aiMarkdown||d.originHash)&&(b=d)}catch{}const I=((s=v.metadata)==null?void 0:s.secretName)||(n==null?void 0:n.name)||"Unnamed Secret",A=((p=v.metadata)==null?void 0:p.createdAt)||r.timestamp;e.innerHTML=`
      <div class="pv-container">
        <header class="pv-header">
          <div class="pv-header-content">
            <h1 class="pv-title">Rootz</h1>
            <span class="pv-badge pv-badge-verified">Public Secret</span>
          </div>
        </header>
        <main class="pv-main">
          <div class="pv-secret-header">
            <h2>${a(I)}</h2>
            ${n!=null&&n.description?`<p class="pv-description">${a(n.description)}</p>`:""}
            ${(l=n==null?void 0:n.tags)!=null&&l.length?`<div class="pv-tags">${n.tags.map(d=>`<span class="pv-tag">${a(d)}</span>`).join("")}</div>`:""}
          </div>

          <div class="pv-verification">
            <h3>Proof of Origin</h3>
            <div class="pv-evidence">
              <div class="pv-evidence-row">
                ${m($?"verified":"failed")}
                <span class="pv-evidence-label">Content Hash</span>
                <code class="pv-evidence-value">${a(v.contentHash)}</code>
                <span class="pv-evidence-status">${$?"Verified":"MISMATCH"}</span>
              </div>
              <div class="pv-evidence-row">
                ${m("verified")}
                <span class="pv-evidence-label">Publisher</span>
                <a href="${u}/address/${r.creator}" target="_blank" class="pv-evidence-value pv-link">${r.creator}</a>
              </div>
              <div class="pv-evidence-row">
                ${m("verified")}
                <span class="pv-evidence-label">Block</span>
                <span class="pv-evidence-value">#${r.blockNumber.toLocaleString()} (${M(A)})</span>
              </div>
              <div class="pv-evidence-row">
                ${m("verified")}
                <span class="pv-evidence-label">IPFS</span>
                <a href="https://gateway.pinata.cloud/ipfs/${v.plaintextIPFSHash}" target="_blank" class="pv-evidence-value pv-link">${v.plaintextIPFSHash}</a>
              </div>
              <div class="pv-evidence-row">
                ${m("verified")}
                <span class="pv-evidence-label">Contract</span>
                <a href="${u}/address/${t}" target="_blank" class="pv-evidence-value pv-link">${t}</a>
              </div>
              <div class="pv-evidence-row">
                ${m("verified")}
                <span class="pv-evidence-label">Transaction</span>
                <a href="${u}/tx/${r.txHash}" target="_blank" class="pv-evidence-value pv-link">${O(r.txHash)}</a>
              </div>
            </div>
          </div>

          <div class="pv-content-section">
            <h3>Content</h3>
            ${b?B(b):n!=null&&n.content?w(n.content):w(g)}
          </div>

          ${z(t,v.contentHash,v.plaintextIPFSHash,r.creator,r.blockNumber,r.txHash,h,u,$)}

          <footer class="pv-footer">
            <p>Verified by <a href="https://rootz.global" target="_blank">Rootz</a> — Document is the address, not a file.</p>
            <p class="pv-footer-address"><code>${t}</code></p>
          </footer>
        </main>
      </div>
    `}catch(c){const h=c instanceof Error?c.message:String(c);e.querySelector(".pv-main").innerHTML=`
      <div class="pv-error">
        <h2>Error Loading Secret</h2>
        <p>${a(h)}</p>
        <p>Address: <code>${a(t)}</code></p>
      </div>
    `}}export{_ as renderPublicViewer};
//# sourceMappingURL=public-viewer-B3R4IaBa.js.map
