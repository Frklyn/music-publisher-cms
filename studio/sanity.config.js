import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'music-publisher',
  title: 'Music Publisher CMS',

  projectId: 'your-project-id',
  dataset: 'production',

  plugins: [
    deskTool(),
    visionTool()
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    // New document options
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter((templateItem) => templateItem.templateId !== 'settings')
      }
      return prev
    },
    // Actions on documents
    actions: (prev, { schemaType }) => {
      if (schemaType === 'settings') {
        return prev.filter(({ action }) => !['unpublish', 'delete'].includes(action))
      }
      return prev
    },
  },

  tools: (prev, { currentUser }) => {
    const isAdmin = currentUser?.roles.some((role) => role.name === 'administrator')
    if (!isAdmin) {
      return prev.filter((tool) => tool.name !== 'vision')
