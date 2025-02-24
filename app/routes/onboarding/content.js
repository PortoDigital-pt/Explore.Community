import React, { useState } from 'react';
import SwipeableTabs from '../../component/SwipeableTabs';

export const Content = () => {
    const [tab, setTab] = useState(0);

    const tabs = Array.from({ length: 5 }, () => (
        <div className='tab'>
          <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit?</h2>
          <p>Lorem ipsum dolor sit, <strong>Test</strong> amet consectetur adipisicing elit. Alias inventore, perspiciatis illum vitae commodi, quisquam, sint ut iusto velit corrupti nihil accusamus magni fugiat exercitationem! Odio dolorem minima repellat corporis?</p>
        </div>
      ));

    return (
        <div className="content">
            <SwipeableTabs
                tabs={tabs}
                tabIndex={tab}
                onSwipe={tab => setTab(tab)}
                classname="swipe-desktop-view"
                hideArrows
                navigationOnBottom
                ariaFrom="swipe-onboarding"
                ariaFromHeader="swipe-onboarding"
            />
        </div>
    );
};