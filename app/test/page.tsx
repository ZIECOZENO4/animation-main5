import React, { Suspense } from 'react';

const NavigationBar = React.lazy(() => 
    import('./navbar22').then(module => ({ default: module.NavigationBar }))
);

const TestPage = () => {
    return (
        <div className='px-[30px]'>
            <Suspense fallback={<div>Loading...</div>}>
                <NavigationBar />
            </Suspense>
        </div>
    );
};

export default TestPage;