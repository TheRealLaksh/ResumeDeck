import React from 'react';
import { Download, FileText, Mail, Palette, ScanSearch } from 'lucide-react';
import LetterTab from './LetterTab';
import ContentTab from './ContentTab';
import DesignTab from './DesignTab';
import ExportTab from './ExportTab';
import ReviewTab from './ReviewTab';

const TABS = [
    { id: 'content', label: 'Content', icon: FileText },
    { id: 'design', label: 'Design', icon: Palette },
    { id: 'review', label: 'Review', icon: ScanSearch },
    { id: 'letter', label: 'Letter', icon: Mail },
    { id: 'export', label: 'Export', icon: Download }
];

const currentTabOf = (activeTab) => (['design', 'review', 'letter', 'export'].includes(activeTab) ? activeTab : 'content');

/** The tabbed editing surface. Used as the desktop sidebar and inside the mobile layout. */
export const EditorTabs = ({ activeTab, setActiveTab }) => {
    const current = currentTabOf(activeTab);
    return (
        <div className="seg" role="tablist" aria-label="Editor sections">
            {TABS.map(({ id, label, icon: Icon }) => (
                <button
                    key={id}
                    role="tab"
                    id={`tab-${id}`}
                    aria-selected={current === id}
                    aria-controls="editor-panel"
                    className="seg-item !min-h-9 !gap-1 !px-1.5"
                    onClick={() => setActiveTab(id === 'content' ? 'sections' : id)}
                >
                    <Icon size={15} />
                    {label}
                </button>
            ))}
        </div>
    );
};

export const EditorBody = (props) => {
    const current = currentTabOf(props.activeTab);
    return current === 'design' ? <DesignTab {...props} />
        : current === 'review' ? <ReviewTab {...props} />
        : current === 'letter' ? <LetterTab {...props} />
        : current === 'export' ? <ExportTab {...props} />
        : <ContentTab {...props} />;
};

const EditorPanel = (props) => (
    <aside className="flex h-full w-[400px] shrink-0 flex-col border-r border-line bg-panel" aria-label="Resume editor">
        <div className="p-3">
            <EditorTabs activeTab={props.activeTab} setActiveTab={props.setActiveTab} />
        </div>
        <div
            id="editor-panel"
            role="tabpanel"
            aria-labelledby={`tab-${currentTabOf(props.activeTab)}`}
            key={props.activeTab}
            className="scroll-quiet flex-1 overflow-y-auto px-4 pb-12 pt-3"
        >
            <EditorBody {...props} />
        </div>
    </aside>
);

export default EditorPanel;
