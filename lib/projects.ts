import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface ProjectMetadata {
  title: string;
  role: string;
  tech: string[];
  description: string;
  challenge: string;
  solution: string;
  outcome: string;
}

export interface ProjectIndexItem {
  id: string;
  title: string;
  title_zh?: string;
  category?: string;
  category_zh?: string;
  video?: string;
  cover?: string;
  features?: string[];
}

export interface ProjectData {
  id: string;
  metadata: ProjectMetadata;
  content: string;
}

/**
 * Get the list of all projects from index.json
 */
export async function getProjectList(): Promise<ProjectIndexItem[]> {
  try {
    const filePath = path.join(process.cwd(), 'public', 'projects', 'index.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error reading project index:', error);
    return [];
  }
}

/**
 * Get project metadata from data.json
 */
export async function getProjectData(id: string): Promise<ProjectMetadata | null> {
  try {
    const filePath = path.join(
      process.cwd(),
      'public',
      'projects',
      id,
      'texts',
      'data.json'
    );
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error(`Error reading project data for ${id}:`, error);
    return null;
  }
}

/**
 * Get project markdown content
 */
export async function getProjectContent(id: string): Promise<string> {
  try {
    const filePath = path.join(
      process.cwd(),
      'public',
      'projects',
      id,
      'texts',
      'page.md'
    );
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return fileContents;
  } catch (error) {
    console.error(`Error reading project content for ${id}:`, error);
    return '';
  }
}

/**
 * Get full project data including metadata and content
 */
export async function getProject(id: string): Promise<ProjectData | null> {
  const metadata = await getProjectData(id);
  if (!metadata) {
    return null;
  }

  const content = await getProjectContent(id);
  return {
    id,
    metadata,
    content,
  };
}

/**
 * Get project assets path
 */
export function getProjectAssetsPath(id: string, assetType: 'images' | 'videos' = 'images'): string {
  return `/projects/${id}/${assetType}`;
}

/**
 * Check if project exists
 */
export async function projectExists(id: string): Promise<boolean> {
  try {
    const projectPath = path.join(process.cwd(), 'public', 'projects', id);
    return fs.existsSync(projectPath);
  } catch (error) {
    return false;
  }
}

