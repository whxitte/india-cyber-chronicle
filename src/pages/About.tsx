import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Shield, Target, Users, Database, BookOpen, AlertTriangle } from "lucide-react";

const About = () => {
  const objectives = [
    {
      icon: Database,
      title: "Comprehensive Documentation",
      description: "Systematically catalog and preserve records of cyber security incidents affecting Indian organizations and infrastructure."
    },
    {
      icon: Target,
      title: "Research & Analysis",
      description: "Provide researchers, analysts, and security professionals with structured data for trend analysis and threat intelligence."
    },
    {
      icon: Users,
      title: "Public Awareness",
      description: "Increase public understanding of cyber threats and their impact on India's digital infrastructure and economy."
    },
    {
      icon: BookOpen,
      title: "Educational Resource",
      description: "Serve as a learning tool for cybersecurity students, professionals, and policymakers to understand incident patterns."
    }
  ];

  const methodology = [
    {
      step: "1",
      title: "Source Collection",
      description: "Gather incident data from CERT-In advisories, news reports, research papers, and official government statements."
    },
    {
      step: "2", 
      title: "Verification",
      description: "Cross-reference information across multiple sources to ensure accuracy and filter out unsubstantiated claims."
    },
    {
      step: "3",
      title: "Categorization",
      description: "Classify incidents by sector, attack type, severity, and impact using standardized taxonomies."
    },
    {
      step: "4",
      title: "Documentation",
      description: "Structure data with comprehensive metadata including sources, timeline, and technical details where available."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Page Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold academic-heading">About the Archive</h1>
            <p className="text-xl text-muted-foreground">
              Understanding the purpose, scope, and methodology behind India's comprehensive cyber incident database
            </p>
          </div>

          {/* Mission Statement */}
          <Card className="p-8 bg-academic-red-lighter/30">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="p-4 rounded-full bg-academic-red">
                  <Shield className="h-8 w-8 text-white" />
                </div>
              </div>
              <h2 className="text-2xl font-bold academic-heading">Our Mission</h2>
              <p className="text-lg academic-body">
                To create a comprehensive, publicly accessible archive of cyber security incidents in India, 
                fostering transparency, research, and improved security awareness across all sectors of society.
              </p>
            </div>
          </Card>

          {/* Project Objectives */}
          <section className="space-y-8">
            <h2 className="text-3xl font-bold academic-heading text-center">Project Objectives</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {objectives.map((objective, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-lg bg-academic-red-lighter">
                      <objective.icon className="h-6 w-6 text-academic-red" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold academic-subheading">{objective.title}</h3>
                      <p className="text-sm academic-body">{objective.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Methodology */}
          <section className="space-y-8">
            <h2 className="text-3xl font-bold academic-heading text-center">Research Methodology</h2>
            <div className="space-y-6">
              {methodology.map((step, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-academic-red text-white flex items-center justify-center font-bold">
                        {step.step}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold academic-subheading">{step.title}</h3>
                      <p className="academic-body">{step.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Scope and Coverage */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold academic-heading text-center">Scope & Coverage</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 text-center">
                <h3 className="font-semibold academic-subheading mb-3">Timeline</h3>
                <p className="academic-body">2001 - 2025</p>
                <p className="text-sm text-muted-foreground mt-2">
                  24+ years of documented cyber incidents
                </p>
              </Card>
              <Card className="p-6 text-center">
                <h3 className="font-semibold academic-subheading mb-3">Sectors</h3>
                <p className="academic-body">15+ Industry Sectors</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Government, Banking, Healthcare, Critical Infrastructure
                </p>
              </Card>
              <Card className="p-6 text-center">
                <h3 className="font-semibold academic-subheading mb-3">Organizations</h3>
                <p className="academic-body">120+ Organizations</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Public and private sector entities
                </p>
              </Card>
            </div>
          </section>

          {/* Important Notice */}
          <Card className="p-6 bg-yellow-50 border-yellow-200">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div className="space-y-2">
                <h3 className="font-semibold text-yellow-800">Important Notice</h3>
                <p className="text-sm text-yellow-700">
                  This archive is compiled for research and educational purposes. All information is sourced from 
                  publicly available reports and official statements. The accuracy of incident details depends on 
                  the quality and completeness of available sources. This resource should not be used as the sole 
                  basis for critical security decisions.
                </p>
              </div>
            </div>
          </Card>

          {/* Creator Information */}
          <section className="text-center space-y-4">
            <h2 className="text-2xl font-bold academic-heading">Research Team</h2>
            <Card className="p-8 bg-muted/30">
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="w-20 h-20 rounded-full bg-academic-red flex items-center justify-center">
                    <Users className="h-10 w-10 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold academic-subheading">Cyber Security Research Initiative</h3>
                  <p className="text-muted-foreground">Independent Research Project</p>
                </div>
                <p className="text-sm academic-body max-w-2xl mx-auto">
                  This archive is maintained by security researchers dedicated to advancing cyber security 
                  awareness in India through systematic documentation and analysis of historical incidents.
                </p>
              </div>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;