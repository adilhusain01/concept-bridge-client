import React from "react";
import { Link } from "react-router-dom";
import {
  Brain,
  Sparkles,
  Network,
  Lock,
  ChevronRight,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import one from "../assets/1.jpg";
import two from "../assets/2.jpg";
import three from "../assets/3.jpg";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-[14rem]">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-8">
            <h1 className="text-6xl font-bold text-gray-800 leading-tight">
              Transform Ideas into
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                Visual Knowledge
              </span>
            </h1>
            <p className="text-xl text-gray-600">
              Experience a revolutionary way to explore, understand, and connect
              ideas through AI-powered interactive mind maps with Exciting
              Rewards.
            </p>
            <div className="flex flex-row gap-4 items-center">
              <Link to="/mindmap">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-6 text-lg rounded-xl shadow-lg flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Start Exploring
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="https://www.youtube.com/watch?v=kXfbsfRVgq8&list=RDkXfbsfRVgq8&start_radio=1">
                <Button
                  variant="ghost"
                  className="text-gray-600 hover:text-gray-800 px-6 text-lg"
                >
                  Watch Demo
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-4 pt-6">
              <div className="flex items-center -space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                  <img
                    src={one}
                    alt=""
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                  <img
                    src={two}
                    alt=""
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center">
                  <img
                    src={three}
                    alt=""
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Join <span className="font-semibold">2,000+</span> knowledge
                explorers
              </p>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl opacity-10 blur-xl"></div>
            <Card className="relative bg-white/90 backdrop-blur-xl border-white/30 shadow-2xl rounded-3xl overflow-hidden">
              <CardContent className="p-6">
                <Link
                  to="https://www.youtube.com/watch?v=kXfbsfRVgq8&list=RDkXfbsfRVgq8&start_radio=1"
                  target="_blank"
                >
                  <iframe
                    width="100%"
                    height="315"
                    src="https://www.youtube.com/embed/kXfbsfRVgq8"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg"
                  ></iframe>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Down Arrow */}
      <div className="flex justify-center py-4">
        <ChevronDown className="w-10 h-10 text-gray-600 animate-bounce" />
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Everything you need to explore knowledge
          </h2>
          <p className="text-xl text-gray-600">
            Powerful features to enhance your learning journey
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-white/90 backdrop-blur-xl border border-white/30 shadow-xl transform hover:scale-105 transition-transform duration-300">
            <CardContent className="p-8 text-center space-y-4">
              <div className="flex justify-center">
                <div className="p-4 bg-blue-100 rounded-2xl">
                  <Brain className="w-8 h-8 text-blue-500" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                AI-Powered Mind Maps
              </h3>
              <p className="text-gray-600">
                Generate comprehensive knowledge maps instantly with our
                advanced AI technology. Explore complex topics with ease.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-xl border border-white/30 shadow-xl transform hover:scale-105 transition-transform duration-300">
            <CardContent className="p-8 text-center space-y-4">
              <div className="flex justify-center">
                <div className="p-4 bg-purple-100 rounded-2xl">
                  <Network className="w-8 h-8 text-purple-500" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                Interactive Exploration
              </h3>
              <p className="text-gray-600">
                Click any concept to dive deeper with detailed explanations.
                Follow your curiosity and discover connections.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-xl border border-white/30 shadow-xl transform hover:scale-105 transition-transform duration-300">
            <CardContent className="p-8 text-center space-y-4">
              <div className="flex justify-center">
                <div className="p-4 bg-pink-100 rounded-2xl">
                  <Lock className="w-8 h-8 text-pink-500" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                Web3 Integration
              </h3>
              <p className="text-gray-600">
                Maintain a streak and get rewarded with tokens and NFTs
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20">
        <Card className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
          <CardContent className="flex flex-col items-center justify-center p-12 text-center space-y-6">
            <h2 className="text-4xl font-bold">
              Ready to transform your learning?
            </h2>
            <p className="text-xl opacity-90">
              Join thousands of knowledge explorers and start your journey
              today.
            </p>
            <Link to="/mindmap">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg rounded-xl shadow-lg flex flex-row">
                <h1>Get Started for Free</h1>
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center border-t border-gray-200 pt-8">
          <div className="flex items-center gap-2">
            <span className="text-gray-600">
              © 2024 ConceptBridge. All rights reserved.
            </span>
          </div>
          <div className="flex gap-6 text-gray-600">
            <a href="#" className="hover:text-gray-800">
              Privacy
            </a>
            <a href="#" className="hover:text-gray-800">
              Terms
            </a>
            <a href="#" className="hover:text-gray-800">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
