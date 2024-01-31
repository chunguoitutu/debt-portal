import {FC} from 'react'
import {BuilderPage} from './BuilderPage'
import {PageTitle} from '@/components/breadcrumbs'

const BuilderPageWrapper: FC = () => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>Layout Builder</PageTitle>
      <BuilderPage />
    </>
  )
}

export default BuilderPageWrapper
