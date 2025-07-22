import { CategoryTest } from '../components/category/CategoryTest';
import { LessonTest } from '../components/lesson/LessonTest';
import { AuthTest } from '../components/auth/AuthTest';

export const HomePage = () => (
	<div className="min-h-screen">
		{/* Main Landing Page */}
		<AuthTest />
		
		{/* Test Components - Only show for development */}
		<div className="bg-gray-100 border-t-4 border-gray-300">
			<div className="max-w-6xl mx-auto px-4 py-12">
				<div className="text-center mb-8">
					<h2 className="text-2xl font-bold text-gray-800 mb-2">Development Components</h2>
					<p className="text-gray-600">Testing UI components for the LangLantern platform</p>
				</div>
				
				<div className="space-y-16">
					<div>
						<h3 className="text-xl font-bold mb-6 text-center">Language Categories</h3>
						<CategoryTest />
					</div>
					
					<div>
						<h3 className="text-xl font-bold mb-6 text-center">Language Lessons</h3>
						<LessonTest />
					</div>
				</div>
			</div>
		</div>
	</div>
);
