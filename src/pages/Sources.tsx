import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, FileText, Globe, Shield, Newspaper, BookOpen } from "lucide-react";

const Sources = () => {
  const sourceCategories = [
    {
      title: "Government & Regulatory",
      icon: Shield,
      description: "Official government agencies and regulatory bodies",
      sources: [
        {
          name: "CERT-In (Indian Computer Emergency Response Team)",
          url: "https://cert-in.org.in",
          description: "Primary source for official cyber security advisories and incident reports",
          type: "Government Agency"
        },
        {
          name: "Ministry of Electronics and IT (MeitY)",
          url: "https://meity.gov.in",
          description: "Policy updates and official statements on cyber security matters",
          type: "Government Ministry"
        },
        {
          name: "Reserve Bank of India (RBI)",
          url: "https://rbi.org.in",
          description: "Banking sector cyber security advisories and incident notifications",
          type: "Financial Regulator"
        },
        {
          name: "National Critical Information Infrastructure Protection Centre",
          url: "https://nciipc.gov.in",
          description: "Critical infrastructure protection and threat intelligence",
          type: "Government Agency"
        }
      ]
    },
    {
      title: "News & Media",
      icon: Newspaper,
      description: "Reputable news organizations and technology publications",
      sources: [
        {
          name: "The Hindu",
          url: "https://thehindu.com",
          description: "National newspaper with dedicated technology and security coverage",
          type: "News Publication"
        },
        {
          name: "Economic Times",
          url: "https://economictimes.com",
          description: "Business and technology news including cyber security incidents",
          type: "Business News"
        },
        {
          name: "LiveMint",
          url: "https://livemint.com",
          description: "Technology and business reporting on cyber security events",
          type: "Financial News"
        },
        {
          name: "Medianama",
          url: "https://medianama.com",
          description: "Technology policy and digital rights coverage",
          type: "Tech Publication"
        }
      ]
    },
    {
      title: "Research & Academic",
      icon: BookOpen,
      description: "Academic institutions and security research organizations",
      sources: [
        {
          name: "Data Security Council of India (DSCI)",
          url: "https://dsci.in",
          description: "Industry body reports and research on data protection",
          type: "Industry Association"
        },
        {
          name: "Observer Research Foundation (ORF)",
          url: "https://orfonline.org",
          description: "Policy research and analysis on cyber security issues",
          type: "Think Tank"
        },
        {
          name: "Institute for Defence Studies and Analyses (IDSA)",
          url: "https://idsa.in",
          description: "Strategic analysis of cyber security and national security",
          type: "Research Institute"
        },
        {
          name: "CyberPeace Foundation",
          url: "https://cyberpeace.org",
          description: "Research reports on cyber crime and security awareness",
          type: "NGO"
        }
      ]
    },
    {
      title: "International Sources",
      icon: Globe,
      description: "Global security organizations and threat intelligence",
      sources: [
        {
          name: "Kaspersky Threat Intelligence",
          url: "https://kaspersky.com",
          description: "Global threat reports with India-specific analysis",
          type: "Security Vendor"
        },
        {
          name: "Symantec Threat Intelligence",
          url: "https://symantec.com",
          description: "Regional threat landscape reports and incident analysis",
          type: "Security Vendor"
        },
        {
          name: "FireEye Threat Intelligence",
          url: "https://fireeye.com",
          description: "Advanced persistent threat research and regional analysis",
          type: "Security Vendor"
        },
        {
          name: "APNIC Security",
          url: "https://apnic.net",
          description: "Asia-Pacific network security research and incidents",
          type: "Regional Organization"
        }
      ]
    }
  ];

  const methodologyNotes = [
    "All sources are cross-referenced to ensure accuracy and eliminate duplication",
    "Only incidents with credible public documentation are included in the archive",
    "Source reliability is evaluated based on reputation, verification process, and track record",
    "Information from multiple sources is triangulated to provide comprehensive incident details",
    "Regular source audits are conducted to maintain data quality and reliability"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Page Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold academic-heading">Sources & References</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A curated collection of authoritative sources used to compile and verify 
              cyber security incident data in the India Cyber Incident Archive
            </p>
          </div>

          {/* Source Categories */}
          {sourceCategories.map((category, categoryIndex) => (
            <section key={categoryIndex} className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-lg bg-academic-blue-lighter">
                  <category.icon className="h-6 w-6 text-academic-blue" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold academic-heading">{category.title}</h2>
                  <p className="text-muted-foreground">{category.description}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {category.sources.map((source, sourceIndex) => (
                  <Card key={sourceIndex} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <h3 className="font-semibold academic-subheading text-lg">{source.name}</h3>
                          <Badge variant="outline" className="text-xs">
                            {source.type}
                          </Badge>
                        </div>
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 text-academic-blue hover:text-academic-blue/80 transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span className="text-sm">Visit</span>
                        </a>
                      </div>
                      <p className="text-sm academic-body">{source.description}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          ))}

          {/* Source Methodology */}
          <section className="space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold academic-heading">Source Methodology</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Our approach to source selection, verification, and quality assurance
              </p>
            </div>

            <Card className="p-8 bg-academic-blue-lighter/30">
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <FileText className="h-6 w-6 text-academic-blue" />
                  <h3 className="text-xl font-semibold academic-subheading">Quality Assurance Process</h3>
                </div>
                
                <div className="space-y-4">
                  {methodologyNotes.map((note, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 rounded-full bg-academic-blue mt-2 flex-shrink-0"></div>
                      <p className="academic-body">{note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </section>

          {/* Source Contribution */}
          <section className="text-center space-y-6">
            <h2 className="text-2xl font-bold academic-heading">Contribute Sources</h2>
            <Card className="p-8 bg-muted/30">
              <div className="space-y-4 max-w-2xl mx-auto">
                <p className="academic-body">
                  Know of additional credible sources for cyber security incidents in India? 
                  We welcome contributions from the security research community.
                </p>
                <div className="text-sm text-muted-foreground">
                  Sources must be publicly verifiable and from reputable organizations. 
                  All submissions are reviewed for accuracy and relevance.
                </div>
                <div className="pt-4">
                  <Badge variant="outline" className="px-4 py-2">
                    Contact: research@cyberarchive.in
                  </Badge>
                </div>
              </div>
            </Card>
          </section>

          {/* Citation Guidelines */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold academic-heading text-center">Citation Guidelines</h2>
            <Card className="p-6">
              <div className="space-y-4">
                <h3 className="font-semibold academic-subheading">How to Cite This Archive</h3>
                <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                  India Cyber Incident Archive (2024). "India Cyber Incident Archive (2001–2025)." 
                  Available at: https://cyberarchive.in [Accessed: {new Date().toLocaleDateString()}]
                </div>
                <p className="text-sm text-muted-foreground">
                  When citing specific incidents, please reference both this archive and the original source material 
                  listed in the incident details.
                </p>
              </div>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Sources;