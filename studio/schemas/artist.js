export default {
  name: 'artist',
  title: 'Artist',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96
      }
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'text'
    },
    {
      name: 'ipiNumber',
      title: 'IPI Number',
      type: 'string',
      description: 'Interested Parties Information number'
    },
    {
      name: 'role',
      title: 'Role',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Composer', value: 'composer'},
          {title: 'Lyricist', value: 'lyricist'},
          {title: 'Arranger', value: 'arranger'},
          {title: 'Performer', value: 'performer'}
        ]
      }
    }
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image'
    }
  }
}
