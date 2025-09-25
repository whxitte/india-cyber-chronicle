# 🇮🇳 India Cybersecurity Incident Archive (2001–2025)  

A **publicly accessible, structured archive of major cybersecurity incidents affecting India** between 2001 and 2025.  
This project documents **200+ verified incidents** across government, banking, healthcare, telecom, defense, and other critical sectors.  

🔗 **Live Website:** [Visit the Archive](https://whxitte.github.io/india-cyber-chronicle/)  

---

## 📌 Project Overview  
The *India Cybersecurity Incident Archive* is the **first initiative to systematically catalog cyber incidents in India**.  
It was created as part of an independent cybersecurity research effort to:  

- Document India’s **cyber threat landscape over 25 years**.  
- Provide a **structured dataset** for researchers, students, policymakers, and security professionals.  
- Increase **public awareness** of cyber risks.  
- Support **future defensive strategies** by studying historical attack patterns.  

---

## 🎯 Objectives  
- **Comprehensive Documentation** – Preserve records of major incidents in one place.  
- **Research & Analysis** – Enable trend analysis and threat intelligence.  
- **Public Awareness** – Highlight the impact of cyber threats on India’s digital ecosystem.  
- **Education** – Serve as a reference for students, educators, and policymakers.  

---

## 🧪 Research Methodology  
1. **Source Collection** – Data gathered from CERT-In advisories, research reports, academic papers, and credible news outlets.  
2. **Verification** – Each incident cross-validated with ≥2 credible sources.  
3. **Categorization** – Incidents classified by sector, type, severity, and impact.  
4. **Documentation** – Standardized JSON/CSV format with metadata and source links.  

---

## 📂 Data Structure (JSON Schema Example)  
```json
{
  "id": "inc-2016-007",
  "date": "2016-10",
  "organization": "Multiple Indian Banks",
  "sector": "Financial",
  "incidentType": "Data Breach / Malware Infection",
  "attackMethod": "Malware injection in payment systems",
  "rootCause": "Vulnerable payment gateway network",
  "impact": "Compromise of 3.2 million debit cards",
  "severity": "High",
  "description": "Malware injected into Hitachi Payment Services' ATM/POS network compromised 3.2M cards.",
  "sources": [
    {
      "title": "The Hindu - Debit Card Breach 2016",
      "url": "https://www.thehindu.com/news/national/32-lakh-debit-cards-compromised-in-cyber-attack-on-banks/article9220591.ece",
      "type": "News Article"
    }
  ],
  "verificationStatus": "Verified"
}
```
## 🌐 Website Features  
- 🔍 **Search & Filter** incidents by year, sector, type, or organization.  
- 📊 **Structured Data** in JSON & CSV formats.  
- 📖 **Detailed Pages** with description, technical details, and sources.  
- 🎓 **Educational Resource** for cybersecurity students and professionals.  

---

## 📅 Scope & Coverage  
- **Timeline:** 2001–2025 (25 years)  
- **Sectors:** Government, Banking, Healthcare, Telecom, Defense, Energy, IT, Education, Retail, etc.  
- **Incidents:** 200+ verified cases  
- **Organizations:** 120+ public & private sector entities  

---

## 👤 Author
**Sethu Satheesh**  
Independent Cybersecurity Researcher | Security Engineer  
📍 Kerala, India  

---

## ⚠️ Important Notice  
This archive is compiled for **research and educational purposes only**.  

- All incidents are sourced from publicly available reports.  
- Accuracy depends on the quality of disclosed information.  
- This archive should not be used as the **sole basis for critical security decisions**.  
