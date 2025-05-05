export default {
  name: 'music',
  title: 'Music',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'artist',
      title: 'Artist',
      type: 'reference',
      to: [{type: 'artist'}]
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'releaseDate',
      title: 'Release Date',
      type: 'date'
    },
    {
      name: 'genre',
      title: 'Genre',
      type: 'string',
      options: {
        list: [
          'Pop',
          'Rock',
          'Jazz',
          'Classical',
          'Hip Hop',
          'Electronic',
          'Other'
        ]
      }
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'licenseType',
      title: 'License Type',
      type: 'string',
      options: {
        list: [
          'Exclusive',
          'Non-Exclusive',
          'Creative Commons'
        ]
      }
    },
    {
      name: 'royaltyRate',
      title: 'Royalty Rate (%)',
      type: 'number',
      validation: Rule => Rule.min(0).max(100)
    }
  ],
  preview: {
    select: {
      title: 'title',
      artist: 'artist.name',
      media: 'coverImage'
    },
    prepare(selection) {
      const {title, artist, media} = selection
      return {
        title: title,
        subtitle: artist ? `by ${artist}` : '',
        media: media
      }
    }
  }
}
