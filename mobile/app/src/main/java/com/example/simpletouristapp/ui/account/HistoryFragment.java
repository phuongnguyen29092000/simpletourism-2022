package com.example.simpletouristapp.ui.account;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TableLayout;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentPagerAdapter;

import com.example.simpletouristapp.databinding.HistoryBinding;

import java.util.ArrayList;
import java.util.List;

public class HistoryFragment extends Fragment {

    private HistoryBinding binding;
    private RecentlyToursBookedFragment recentlyToursBookedFragment;
    private PaidToursFragment paidToursFragment;

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        binding = HistoryBinding.inflate(inflater, container, false);
        View root = binding.getRoot();

        recentlyToursBookedFragment = new RecentlyToursBookedFragment();
        paidToursFragment = new PaidToursFragment();

        binding.tabLayout.setupWithViewPager(binding.viewPager);

        ViewPagerAdapter viewPagerAdapter = new ViewPagerAdapter(getActivity().getSupportFragmentManager(),0);
        viewPagerAdapter.addFragment(recentlyToursBookedFragment,"Tour đã đặt");
        viewPagerAdapter.addFragment(paidToursFragment,"Tour đã thanh toán");
        binding.viewPager.setAdapter(viewPagerAdapter);
        return root;
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }

    private class ViewPagerAdapter extends FragmentPagerAdapter{

        private List<Fragment> fragments = new ArrayList<>();
        private List<String> fragmentTitle = new ArrayList<>();

        public ViewPagerAdapter(@NonNull FragmentManager fm, int behavior) {
            super(fm, behavior);
        }

        @NonNull
        @Override
        public Fragment getItem(int position) {
            return fragments.get(position);
        }

        @Override
        public int getCount() {
            return fragments.size();
        }

        @Nullable
        @Override
        public CharSequence getPageTitle(int position) {
            return fragmentTitle.get(position);
        }

        public void addFragment(Fragment fragment, String title){
            fragments.add(fragment);
            fragmentTitle.add(title);
        }
    }
}
