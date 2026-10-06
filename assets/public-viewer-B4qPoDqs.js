import{l as C,i as P,A,t as w}from"./index-CVO6pzsg.js";const V="https://api.etherscan.io/v2/api",E=["https://gateway.pinata.cloud/ipfs/","https://ipfs.io/ipfs/","https://cloudflare-ipfs.com/ipfs/"],T=P("KeyVaultCreated(uint256,address,bytes,bytes,uint256)");async function x(t,e,i){const o=new URL(V);o.searchParams.set("chainid",e.toString()),o.searchParams.set("module","logs"),o.searchParams.set("action","getLogs"),o.searchParams.set("apikey",i),o.searchParams.set("address",t),o.searchParams.set("topic0",T),o.searchParams.set("fromBlock","0"),o.searchParams.set("toBlock","latest");const r=await fetch(o.toString());if(!r.ok)throw new Error(`Etherscan API error: ${r.status}`);const p=await r.json();if(p.status==="0"||typeof p.result=="string"||p.result.length===0)return null;const d=p.result[0],c=parseInt(d.topics[1],16),l="0x"+d.topics[2].slice(-40),s=new A().decode(["bytes","bytes","uint256"],d.data);return{blockNumber:c,creator:l.toLowerCase(),encryptedKeysData:w(s[0]),schemaDefinition:w(s[1]),timestamp:Number(s[2]),txHash:d.transactionHash}}async function D(t){for(const e of E)try{const i=await fetch(e+t,{signal:AbortSignal.timeout(15e3)});if(i.ok)return await i.text()}catch{}throw new Error(`Failed to fetch from IPFS: ${t}`)}async function F(t){const e=new TextEncoder,i=await crypto.subtle.digest("SHA-256",e.encode(t));return"sha256:"+Array.from(new Uint8Array(i)).map(r=>r.toString(16).padStart(2,"0")).join("")}function a(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function L(t){return t.slice(0,6)+"..."+t.slice(-4)}function N(t){return t<1e12&&(t*=1e3),new Date(t).toLocaleString()}function g(t){const e={pending:"&#8987;",verified:"&#10004;",failed:"&#10008;"};return`<span class="pv-badge ${{pending:"pv-badge-pending",verified:"pv-badge-verified",failed:"pv-badge-failed"}[t]}">${e[t]}</span>`}function O(t){var r;const e=(r=t.topics)!=null&&r.length?`<div class="pv-topics">${t.topics.map(p=>`<span class="pv-topic">${a(p)}</span>`).join("")}</div>`:"",i=`
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
  `}function k(t){let e=a(t);return e=e.replace(/```(\w*)\n([\s\S]*?)```/g,"<pre><code>$2</code></pre>"),e=e.replace(/`([^`]+)`/g,"<code>$1</code>"),e=e.replace(/^#### (.+)$/gm,"<h4>$1</h4>"),e=e.replace(/^### (.+)$/gm,"<h3>$1</h3>"),e=e.replace(/^## (.+)$/gm,"<h2>$1</h2>"),e=e.replace(/^# (.+)$/gm,"<h1>$1</h1>"),e=e.replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>"),e=e.replace(/\*(.+?)\*/g,"<em>$1</em>"),e=e.replace(/^- (.+)$/gm,"<li>$1</li>"),e=e.replace(/(<li>.*<\/li>\n?)+/g,"<ul>$&</ul>"),e=e.replace(/^---$/gm,"<hr>"),e=e.replace(/\n\n/g,"</p><p>"),e="<p>"+e+"</p>",e=e.replace(/<p>\s*<\/p>/g,""),e=e.replace(/<p>(<h[1-4]>)/g,"$1"),e=e.replace(/(<\/h[1-4]>)<\/p>/g,"$1"),e=e.replace(/<p>(<pre>)/g,"$1"),e=e.replace(/(<\/pre>)<\/p>/g,"$1"),e=e.replace(/<p>(<ul>)/g,"$1"),e=e.replace(/(<\/ul>)<\/p>/g,"$1"),e=e.replace(/<p>(<hr>)<\/p>/g,"$1"),e}function M(t,e,i,o,r,p,d,c,l){const v={"@context":"https://schema.org","@type":"DigitalDocument",name:"Rootz Public Data Wallet",description:"A cryptographically verified document stored on IPFS with proof of origin recorded on Polygon blockchain.",url:`https://dashboard.rootz.global/#/s/${t}`,encoding:{"@type":"MediaObject",contentUrl:`https://gateway.pinata.cloud/ipfs/${i}`,encodingFormat:"application/json",sha256:e.replace("sha256:","")},publisher:{"@type":"Organization",name:"Rootz",url:"https://rootz.global"},creator:o,datePublished:new Date().toISOString(),identifier:t,additionalProperty:[{"@type":"PropertyValue",name:"blockchain",value:"Polygon Mainnet"},{"@type":"PropertyValue",name:"chainId",value:d},{"@type":"PropertyValue",name:"blockNumber",value:r},{"@type":"PropertyValue",name:"transactionHash",value:p},{"@type":"PropertyValue",name:"contractAddress",value:t},{"@type":"PropertyValue",name:"ipfsCID",value:i},{"@type":"PropertyValue",name:"contentHash",value:e},{"@type":"PropertyValue",name:"hashVerified",value:l}]},s=`
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
          <pre><code>curl "https://api.etherscan.io/v2/api?chainid=${d}&amp;module=logs&amp;action=getLogs&amp;address=${a(t)}&amp;topic0=0x${a(P("KeyVaultCreated(uint256,address,bytes,bytes,uint256)").slice(2))}&amp;fromBlock=0&amp;toBlock=latest&amp;apikey=YourApiKey"</code></pre>
          <p>The response contains the content hash, IPFS CID, and publisher address in the event data.
             Decode the <code>encryptedKeysData</code> field (ABI-encoded bytes) to find the JSON with <code>contentHash</code> and <code>plaintextIPFSHash</code>.</p>

          <h4>Step 4: Confirm Publisher Identity</h4>
          <p>The publisher address <code>${a(o)}</code> is extracted from the indexed event parameter (topic[2]).
             View their full transaction history:</p>
          <pre><code>${a(c)}/address/${a(o)}</code></pre>

          <h4>Step 5: Confirm Block Timestamp</h4>
          <p>The publication timestamp is the block time of block <strong>#${r.toLocaleString()}</strong>:</p>
          <pre><code>${a(c)}/block/${r}</code></pre>

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
            <li>Confirm block #${r.toLocaleString()} timestamp on Polygon (chainId ${d})</li>
          </ol>
          <p><strong>Result: ${l?"ALL CHECKS PASSED":"HASH MISMATCH DETECTED"}</strong> — Content integrity ${l?"confirmed":"FAILED"}.</p>

          <p class="pv-ai-guide-footer">
            <em>Learn more about the AI Discovery standard: <a href="https://rootz.global/.well-known/ai" target="_blank">rootz.global/.well-known/ai</a></em>
          </p>
        </div>
      </details>
    </div>
  `;return`
    <script type="application/ld+json">${JSON.stringify(v)}<\/script>
    ${s}
  `}function S(t){try{const e=JSON.parse(t);return`<pre class="pv-json">${a(JSON.stringify(e,null,2))}</pre>`}catch{return`<div class="pv-plain-content">${k(t)}</div>`}}async function j(t){var r,p,d;const e=document.getElementById("app")||document.body;e.innerHTML="",e.className="pv-app",e.innerHTML=`
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
  `;const i=document.getElementById("pv-step"),o=c=>{i&&(i.textContent=c)};try{const c=await C(),l=c.network.chainId,v=c.network.explorer;o("Querying KeyVaultCreated event...");const s=await x(t,l,c.etherscanApiKey);if(!s){e.querySelector(".pv-main").innerHTML=`
        <div class="pv-error">
          <h2>Secret Not Found</h2>
          <p>No KeyVaultCreated event found for <code>${a(t)}</code> on chain ${l}.</p>
          <p>This could mean the secret doesn't exist or hasn't been indexed yet.</p>
          <a href="${v}/address/${t}" target="_blank">View on Explorer</a>
        </div>
      `;return}o("Parsing key vault data...");let h;try{h=JSON.parse(s.encryptedKeysData)}catch{e.querySelector(".pv-main").innerHTML=`
        <div class="pv-error">
          <h2>Parse Error</h2>
          <p>Could not parse KeyVault data. The data may be encrypted (this viewer only supports public secrets).</p>
          <p>For encrypted secrets, use the full Rootz Desktop V6 application.</p>
        </div>
      `;return}if(!h.isPublic){e.querySelector(".pv-main").innerHTML=`
        <div class="pv-error">
          <h2>Encrypted Secret</h2>
          <p>This secret is encrypted and cannot be viewed publicly.</p>
          <p>Use Rootz Desktop V6 to decrypt, or request a share link from the owner.</p>
          <a href="${v}/address/${t}" target="_blank">View Contract on Explorer</a>
        </div>
      `;return}o("Fetching content from IPFS...");const y=await D(h.plaintextIPFSHash);o("Verifying content integrity...");let f,m;try{f=JSON.parse(y),m=f.plainContent||y}catch{f={},m=y}const $=await F(m)===h.contentHash;let n=null;try{n=JSON.parse(m)}catch{}let b=null;if((n==null?void 0:n.type)==="document-wallet"||n!=null&&n.content)try{const u=JSON.parse(n.content);(u.type==="document-wallet"||u.aiMarkdown||u.originHash)&&(b=u)}catch{}const H=((r=h.metadata)==null?void 0:r.secretName)||(n==null?void 0:n.name)||"Unnamed Secret",I=((p=h.metadata)==null?void 0:p.createdAt)||s.timestamp;e.innerHTML=`
      <div class="pv-container">
        <header class="pv-header">
          <div class="pv-header-content">
            <h1 class="pv-title">Rootz</h1>
            <span class="pv-badge pv-badge-verified">Public Secret</span>
          </div>
        </header>
        <main class="pv-main">
          <div class="pv-secret-header">
            <h2>${a(H)}</h2>
            ${n!=null&&n.description?`<p class="pv-description">${a(n.description)}</p>`:""}
            ${(d=n==null?void 0:n.tags)!=null&&d.length?`<div class="pv-tags">${n.tags.map(u=>`<span class="pv-tag">${a(u)}</span>`).join("")}</div>`:""}
          </div>

          <div class="pv-verification">
            <h3>Proof of Origin</h3>
            <div class="pv-evidence">
              <div class="pv-evidence-row">
                ${g($?"verified":"failed")}
                <span class="pv-evidence-label">Content Hash</span>
                <code class="pv-evidence-value">${a(h.contentHash)}</code>
                <span class="pv-evidence-status">${$?"Verified":"MISMATCH"}</span>
              </div>
              <div class="pv-evidence-row">
                ${g("verified")}
                <span class="pv-evidence-label">Publisher</span>
                <a href="${v}/address/${s.creator}" target="_blank" class="pv-evidence-value pv-link">${s.creator}</a>
              </div>
              <div class="pv-evidence-row">
                ${g("verified")}
                <span class="pv-evidence-label">Block</span>
                <span class="pv-evidence-value">#${s.blockNumber.toLocaleString()} (${N(I)})</span>
              </div>
              <div class="pv-evidence-row">
                ${g("verified")}
                <span class="pv-evidence-label">IPFS</span>
                <a href="https://gateway.pinata.cloud/ipfs/${h.plaintextIPFSHash}" target="_blank" class="pv-evidence-value pv-link">${h.plaintextIPFSHash}</a>
              </div>
              <div class="pv-evidence-row">
                ${g("verified")}
                <span class="pv-evidence-label">Contract</span>
                <a href="${v}/address/${t}" target="_blank" class="pv-evidence-value pv-link">${t}</a>
              </div>
              <div class="pv-evidence-row">
                ${g("verified")}
                <span class="pv-evidence-label">Transaction</span>
                <a href="${v}/tx/${s.txHash}" target="_blank" class="pv-evidence-value pv-link">${L(s.txHash)}</a>
              </div>
            </div>
          </div>

          <div class="pv-content-section">
            <h3>Content</h3>
            ${b?O(b):n!=null&&n.content?S(n.content):S(m)}
          </div>

          ${M(t,h.contentHash,h.plaintextIPFSHash,s.creator,s.blockNumber,s.txHash,l,v,$)}

          <footer class="pv-footer">
            <p>Verified by <a href="https://rootz.global" target="_blank">Rootz</a> — Document is the address, not a file.</p>
            <p class="pv-footer-address"><code>${t}</code></p>
          </footer>
        </main>
      </div>
    `}catch(c){const l=c instanceof Error?c.message:String(c);e.querySelector(".pv-main").innerHTML=`
      <div class="pv-error">
        <h2>Error Loading Secret</h2>
        <p>${a(l)}</p>
        <p>Address: <code>${a(t)}</code></p>
      </div>
    `}}export{j as renderPublicViewer};
//# sourceMappingURL=public-viewer-B4qPoDqs.js.map
