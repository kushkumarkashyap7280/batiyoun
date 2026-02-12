'use client';

import { Upload as UploadIcon, FileVideo, Image, FileAudio } from 'lucide-react';

export default function UploadTab() {
  return (
    <div className="h-full bg-page overflow-auto">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 pb-20">
        <div className="bg-surface border border-line rounded-2xl p-4 sm:p-5 shadow-sm">
          <h1 className="text-lg sm:text-xl font-semibold text-default mb-3">Upload Media</h1>
          <p className="text-sm text-muted mb-4">Share files, images, and videos with your contacts</p>
        </div>

        {/* Upload Area */}
        <div className="mt-4">
          <div className="border-2 border-dashed border-line rounded-2xl p-8 sm:p-12 text-center bg-card hover:bg-hover-surface transition-colors cursor-pointer">
            <UploadIcon className="w-12 h-12 mx-auto text-muted mb-4" />
            <h3 className="text-lg font-semibold text-default mb-2">Drag and drop files here</h3>
            <p className="text-sm text-muted mb-4">or</p>
            <button className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition-colors">
              Browse Files
            </button>
          </div>
        </div>

        {/* Quick Upload Options */}
        <section className="mt-8">
          <h2 className="text-sm font-semibold text-subtle uppercase tracking-wide mb-4">Quick Upload</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* Image Upload */}
            <button className="p-4 rounded-xl bg-surface border border-line hover:bg-hover-surface transition-colors flex flex-col items-center gap-3">
              <Image className="w-8 h-8 text-green-500" />
              <span className="text-xs font-medium text-default">Images</span>
            </button>

            {/* Video Upload */}
            <button className="p-4 rounded-xl bg-surface border border-line hover:bg-hover-surface transition-colors flex flex-col items-center gap-3">
              <FileVideo className="w-8 h-8 text-blue-500" />
              <span className="text-xs font-medium text-default">Videos</span>
            </button>

            {/* Audio Upload */}
            <button className="p-4 rounded-xl bg-surface border border-line hover:bg-hover-surface transition-colors flex flex-col items-center gap-3">
              <FileAudio className="w-8 h-8 text-purple-500" />
              <span className="text-xs font-medium text-default">Audio</span>
            </button>

            {/* Files Upload */}
            <button className="p-4 rounded-xl bg-surface border border-line hover:bg-hover-surface transition-colors flex flex-col items-center gap-3">
              <FileAudio className="w-8 h-8 text-orange-500" />
              <span className="text-xs font-medium text-default">Documents</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
