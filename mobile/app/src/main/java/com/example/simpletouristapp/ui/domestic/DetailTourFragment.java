package com.example.simpletouristapp.ui.domestic;

import android.content.DialogInterface;
import android.graphics.Paint;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;
import androidx.navigation.Navigation;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import com.denzcoskun.imageslider.constants.ScaleTypes;
import com.denzcoskun.imageslider.models.SlideModel;
import com.example.simpletouristapp.MainActivity;
import com.example.simpletouristapp.R;
import com.example.simpletouristapp.adapter.FeedBackAdapter;
import com.example.simpletouristapp.databinding.DetailTourBinding;
import com.example.simpletouristapp.model.FeedBackResponse;
import com.example.simpletouristapp.model.Tour;
import com.example.simpletouristapp.model.TourResponse;
import com.example.simpletouristapp.service.ToursApiService;
import com.google.android.material.dialog.MaterialAlertDialogBuilder;

import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class DetailTourFragment extends Fragment {
    private String tourId;
    private DetailTourBinding binding;
    private ToursApiService toursApiService;
    private List<SlideModel> slideModelList;
    private FeedBackAdapter feedBackAdapter;
    private RecyclerView rvFeedback;



    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            tourId = (String) getArguments().getSerializable("IdTour");
        }
    }

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {

        binding = DetailTourBinding.inflate(inflater, container, false);
        View root = binding.getRoot();

        MaterialAlertDialogBuilder builder = new MaterialAlertDialogBuilder(getContext());

        rvFeedback = binding.rvFeedback;

        slideModelList = new ArrayList<>();

        toursApiService = new ToursApiService();

        Call<FeedBackResponse> call2 = toursApiService.getFeedBackById(tourId);
        call2.enqueue(new Callback<FeedBackResponse>() {
            @Override
            public void onResponse(Call<FeedBackResponse> call, Response<FeedBackResponse> response) {
                if(response.code() == 200){
                    FeedBackResponse feedBackResponse = response.body();
                    feedBackAdapter = new FeedBackAdapter(getContext(),feedBackResponse.getData());
                    rvFeedback.setLayoutManager(new LinearLayoutManager(getContext()));
                    rvFeedback.setAdapter(feedBackAdapter);
                }
            }

            @Override
            public void onFailure(Call<FeedBackResponse> call, Throwable t) {
                Toast.makeText(getContext(), t.getMessage(), Toast.LENGTH_SHORT).show();
                Log.d("feedbackerror",t.getMessage());
            }
        });

        Call<TourResponse> call = toursApiService.getTourByIdAPi(tourId);
        call.enqueue(new Callback<TourResponse>() {
            @Override
            public void onResponse(Call<TourResponse> call, Response<TourResponse> response) {
                if(response.code() == 200){
                    TourResponse tourResponse = response.body();
                    Tour tour = tourResponse.data;

                    Locale lc = new Locale("nv","VN");
                    NumberFormat nf = NumberFormat.getCurrencyInstance(lc);
                    String pattern = "dd/MM/yyyy";
                    SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
                    ((AppCompatActivity) requireActivity()).getSupportActionBar().setTitle(tour.getNameTour());
                    slideModelList.add(new SlideModel(ToursApiService.BASE_URL + tour.getImageAvatar().substring(7),null));
                    for (String slide: tour.getImageSlide()
                    ) {
                        slideModelList.add(new SlideModel(ToursApiService.BASE_URL + slide.substring(7),null));
                    }
                    binding.nameTour.setText(tour.getNameTour());
                    binding.ratingTour.setRating(tour.getRating());
                    binding.imageSlideDetail.setImageList(slideModelList, ScaleTypes.CENTER_CROP);
                    binding.tvDetailPrice.setText(nf.format(tour.getPrice()));
                    if(tour.getDiscount() != 0){
                        binding.tvDetailPrice.setPaintFlags(binding.tvDetailPrice.getPaintFlags() | Paint.STRIKE_THRU_TEXT_FLAG);

                        binding.tvPriceAfterDiscount.setText(nf.format(tour.getPrice()*(1-tour.getDiscount())));
                        binding.tvPriceAfterDiscount.setVisibility(View.VISIBLE);
                    }
                    binding.tvTimeDetail.setText(simpleDateFormat.format(tour.getTimeStart()) + " - " + simpleDateFormat.format(tour.getTimeEnd()));
                    binding.tvHotelDetail.setText(tour.getNameHotel());
                    binding.tvAmountDetail.setText(Integer.toString(tour.getAmount()));
                    binding.tvAmountRemainDetail.setText(Integer.toString(tour.getRemainingAmount()));

                    binding.tvTypePlace.setText(tour.getTypePlace().getName());

                    binding.description.setText(tour.getDescription());
                    binding.schedule.setText(tour.getSchedule());

                }else {
                    Toast.makeText(getContext(), "Wrong Id Tour", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<TourResponse> call, Throwable t) {
                Toast.makeText(getContext(), t.getMessage(), Toast.LENGTH_SHORT).show();
                Log.d("TAG",t.getMessage());
            }
        });

        Log.d("tourId",tourId);

        binding.btnBookTour.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Log.d("TAG", String.valueOf(getActivity()));
                if(getActivity().getClass() == MainActivity.class){
                    builder.setTitle("Bạn cần phải đăng nhập trước khi đặt tour");
                    builder.setPositiveButton(R.string.accept, new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialogInterface, int i) {
                            Navigation.findNavController(view).navigate(R.id.action_nav_detail_tour_to_nav_login);
                        }
                    });
                    builder.setNeutralButton("Cancel", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialogInterface, int i) {
                            dialogInterface.dismiss();
                        }
                    });
                    builder.show();
                }else {
                    Bundle bundle = new Bundle();
                    bundle.putSerializable("tourName", binding.nameTour.getText().toString());
                    bundle.putSerializable("idTour", tourId);
                    bundle.putSerializable("price", binding.tvDetailPrice.getText().toString());
                    Navigation.findNavController(view).navigate(R.id.action_nav_detail_tour_to_nav_book_tour,bundle);
                }

            }
        });

        binding.seeMoreDescription.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                binding.description.setMaxLines(20);
                binding.seeMoreDescription.setVisibility(View.GONE);
                binding.hideDescription.setVisibility(View.VISIBLE);
            }
        });
        binding.hideDescription.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                binding.description.setMaxLines(2);
                binding.hideDescription.setVisibility(View.GONE);
                binding.seeMoreDescription.setVisibility(View.VISIBLE);
            }
        });

        binding.seeMore.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                binding.schedule.setMaxLines(20);
                binding.seeMore.setVisibility(View.GONE);
                binding.hide.setVisibility(View.VISIBLE);
            }
        });
        binding.hide.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                binding.schedule.setMaxLines(2);
                binding.hide.setVisibility(View.GONE);
                binding.seeMore.setVisibility(View.VISIBLE);
            }
        });
        return root;
    }
    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }
}
