import { BaseLayout } from '@/components/layouts/base-layout'
import { AvatarUploadForm } from './AvatarUploadForm'
import { PhotosUploadForm } from './PhotosUploadForm'
import { CreateProductForm } from './CreateProductForm'

const UploadsPage = () => {
  return (
     <BaseLayout title="Products" description="Manage your products">
        <div className="@container/main px-4 lg:px-6 ">
           <h2 className='font-bold text-xl'>Single Upload</h2>
           <AvatarUploadForm />
           <h2 className='font-bold text-xl'>Single Array</h2>
           <PhotosUploadForm />

           <h2 className='font-bold text-xl'>Multi Input Types</h2>
           <CreateProductForm />
        </div>
     </BaseLayout>
  )
}

export default UploadsPage