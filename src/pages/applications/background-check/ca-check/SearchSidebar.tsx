import * as React from 'react'
import {MinimalButton, Spinner} from '@react-pdf-viewer/core'
import {
  Match,
  NextIcon,
  PreviousIcon,
  RenderSearchProps,
  SearchPlugin,
} from '@react-pdf-viewer/search'

enum SearchStatus {
  NotSearchedYet,
  Searching,
  FoundResults,
}

interface SearchSidebarProps {
  searchPluginInstance: SearchPlugin
}

const SearchSidebar: React.FC<SearchSidebarProps> = ({searchPluginInstance}) => {
  const [searchStatus, setSearchStatus] = React.useState(SearchStatus.NotSearchedYet)
  const [matches, setMatches] = React.useState<Match[]>([])
  const textBoxRef = React.useRef<HTMLInputElement | null>(null)
  const {Search} = searchPluginInstance

  const renderMatchSample = (match: Match) => {
    //  match.startIndex    match.endIndex
    //      |                       |
    //      ▼                       ▼
    //  ....[_____props.keyword_____]....

    const wordsBefore = match.pageText.substr(match.startIndex - 20, 20)
    let words = wordsBefore.split(' ')
    words.shift()
    const begin = words.length === 0 ? wordsBefore : words.join(' ')

    const wordsAfter = match.pageText.substr(match.endIndex, 60)
    words = wordsAfter.split(' ')
    words.pop()
    const end = words.length === 0 ? wordsAfter : words.join(' ')

    return (
      <div>
        {begin}
        <span style={{backgroundColor: 'rgb(255, 255, 0)'}}>
          {match.pageText.substring(match.startIndex, match.endIndex)}
        </span>
        {end}
      </div>
    )
  }

  return (
    <Search>
      {(renderSearchProps: RenderSearchProps) => {
        const {
          currentMatch,
          keyword,
          setKeyword,
          jumpToMatch,
          jumpToNextMatch,
          jumpToPreviousMatch,
          search,
        } = renderSearchProps

        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              overflow: 'hidden',
              width: '100%',
            }}
          >
            <div style={{padding: '.5rem'}}>
              <div style={{position: 'relative'}}>
                <input
                  ref={textBoxRef}
                  id='cas_check_listing_pdf'
                  name='cas_check_listing_pdf'
                  className='rpv-core__textbox_input'
                  placeholder='Enter to search'
                  value={keyword}
                  onChange={(e) => {
                    setKeyword(e.target.value)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setSearchStatus(SearchStatus.Searching)
                      search().then((matches) => {
                        setSearchStatus(SearchStatus.FoundResults)
                        setMatches(matches)
                      })
                    }
                  }}
                />
                {searchStatus === SearchStatus.Searching && (
                  <div
                    style={{
                      alignItems: 'center',
                      display: 'flex',
                      bottom: 0,
                      position: 'absolute',
                      right: '.5rem',
                      top: 0,
                    }}
                  >
                    <Spinner size='1.5rem' />
                  </div>
                )}
              </div>
            </div>
            {searchStatus === SearchStatus.FoundResults && (
              <div className='Not_found_ca_check'>
                {matches.length === 0 && 'Not found'}
                {matches.length > 0 && (
                  <>
                    <div
                      style={{
                        alignItems: 'center',
                        display: 'flex',
                        padding: '.5rem',
                      }}
                    >
                      <div className='Not_found_ca_check'>Found {matches.length} results</div>
                      <div style={{marginLeft: 'auto', marginRight: '.5rem'}}>
                        <MinimalButton onClick={jumpToPreviousMatch}>
                          <PreviousIcon />
                        </MinimalButton>
                      </div>
                      <MinimalButton onClick={jumpToNextMatch}>
                        <NextIcon />
                      </MinimalButton>
                    </div>
                    <div
                      style={{
                        borderTop: '1px solid rgba(0, 0, 0, .2)',
                        flex: 1,
                        overflow: 'auto',
                        padding: '.5rem 1rem',
                      }}
                    >
                      {matches.map((match, index) => (
                        <div key={index} style={{margin: '1rem 0'}}>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              marginBottom: '.5rem',
                            }}
                          >
                            <div>#{index + 1}</div>
                            <div
                              style={{
                                color: 'rgba(0, 0, 0, .5)',
                                fontSize: '.8rem',
                                textAlign: 'right',
                              }}
                            >
                              Page {match.pageIndex + 1}
                            </div>
                          </div>
                          <div
                            style={{
                              backgroundColor:
                                currentMatch === index + 1 ? 'rgba(0, 0, 0, .1)' : '',
                              border: '1px solid rgba(0, 0, 0, .2)',
                              borderRadius: '.25rem',
                              cursor: 'pointer',
                              overflowWrap: 'break-word',
                              padding: '.5rem',
                            }}
                            onClick={() => jumpToMatch(index + 1)}
                          >
                            {renderMatchSample(match)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        )
      }}
    </Search>
  )
}

export default SearchSidebar
