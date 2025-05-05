export default {
  name: 'music',
  title: 'Music Work',
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
      name: 'iswc',
      title: 'ISWC',
      type: 'string',
      description: 'International Standard Musical Work Code'
    },
    {
      name: 'artists',
      title: 'Artists',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'artist',
              title: 'Artist',
              type: 'reference',
              to: [{type: 'artist'}]
            },
            {
              name: 'role',
              title: 'Role',
              type: 'string',
              options: {
                list: [
                  {title: 'Composer', value: 'composer'},
                  {title: 'Lyricist', value: 'lyricist'},
                  {title: 'Arranger', value: 'arranger'},
                  {title: 'Performer', value: 'performer'}
                ]
              }
            },
            {
              name: 'share',
              title: 'Share (%)',
              type: 'number',
              validation: Rule => Rule.min(0).max(100)
            }
          ],
          preview: {
            select: {
              title: 'artist.name',
              subtitle: 'role',
              share: 'share'
            },
            prepare({title, subtitle, share}) {
              return {
                title: title || 'No artist selected',
                subtitle: `${subtitle || 'No role'} (${share || 0}%)`
              }
            }
          }
        }
      ]
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
          'Electronic',
          'Hip Hop',
          'R&B',
          'Folk',
          'Country',
          'World',
          'Other'
        ]
      }
    },
    {
      name: 'releaseDate',
      title: 'Release Date',
      type: 'date'
    },
    {
      name: 'license',
      title: 'License',
      type: 'object',
      fields: [
        {
          name: 'type',
          title: 'License Type',
          type: 'string',
          options: {
            list: [
              {title: 'Exclusive', value: 'exclusive'},
              {title: 'Non-Exclusive', value: 'non-exclusive'},
              {title: 'Creative Commons', value: 'creative-commons'}
            ]
          }
        },
        {
          name: 'territory',
          title: 'Territory',
          type: 'string',
          options: {
            list: [
              {title: 'Worldwide', value: 'worldwide'},
              {title: 'North America', value: 'north-america'},
              {title: 'Europe', value: 'europe'},
              {title: 'Asia', value: 'asia'},
              {title: 'Other', value: 'other'}
            ]
          }
        },
        {
          name: 'startDate',
          title: 'Start Date',
          type: 'date'
        },
        {
          name: 'endDate',
          title: 'End Date',
          type: 'date'
        }
      ]
    },
    {
      name: 'royalties',
      title: 'Royalties',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'type',
              title: 'Royalty Type',
              type: 'string',
              options: {
                list: [
                  {title: 'Performance', value: 'performance'},
                  {title: 'Mechanical', value: 'mechanical'},
                  {title: 'Sync', value: 'sync'},
                  {title: 'Digital', value: 'digital'}
                ]
              }
            },
            {
              name: 'rate',
              title: 'Rate (%)',
              type: 'number',
              validation: Rule => Rule.min(0).max(100)
            },
            {
              name: 'recipient',
              title: 'Recipient',
              type: 'reference',
              to: [{type: 'artist'}]
            }
          ]
        }
      ]
    },
    {
      name: 'lyrics',
      title: 'Lyrics',
      type: 'text',
      rows: 10
    },
    {
      name: 'notes',
      title: 'Notes',
      type: 'text'
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'iswc'
    },
    prepare({title, subtitle}) {
      return {
        title: title || 'Untitled Work',
        subtitle: subtitle ? `ISWC: ${subtitle}` : 'No ISWC'
      }
    }
  }
}
